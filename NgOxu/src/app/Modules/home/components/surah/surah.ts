import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule} from '@angular/common';

import {
  NgpTabset,
  NgpTabList,
  NgpTabButton,
  NgpTabPanel
} from 'ng-primitives/tabs';

import {NgxPaginationModule} from 'ngx-pagination';

import {QuranService} from "../../../../Core/quran.service";
import {BaseSurah, BaseVerse, CharType, ILetter, ISurah, IVerse, IWord} from "../../../../Core/Models";
import {SemanticService} from "../../../../Core/SemanticService";
import {Arabic} from "../../../../Core/Database/Arabic";
import {Unicode} from "../../../../Core/Database/Data/Unicode";
import {StorageType, WebStorageService} from "../../../../Shared/services/Storage/web-storage.service";
import {IPA} from "../../../../Core/Database/Data/IPA";


@Component({
  selector: 'app-surah',
  imports: [
    CommonModule, RouterLink, RouterLinkActive,
    NgpTabset, NgpTabList, NgpTabButton, NgpTabPanel,
    NgxPaginationModule
  ],
  templateUrl: './surah.html',
  styleUrl: './surah.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Surah implements OnInit {

  selectedTab: 'beta' | 'base' = 'beta';

  SurahList: { Count: number; Seq: number; Name: string }[] | undefined = [];

  BaseSurah: BaseSurah | undefined;
  Surah: ISurah | undefined;

  CurrentPage: number = 1;
  BaseItems: BaseVerse[] = [];
  // BasePagination: { CurrentPage: number, Items: BaseVerse[] } = {CurrentPage: 1, Items: []};
  BetaItems: IVerse[] = [];
  // BetaPagination: { CurrentPage: number, Items: IVerse[] } = {CurrentPage: 1, Items: []};

  Original = true;
  Detailed = false;
  Latin = false;
  LatinIPA = false;

  constructor(private route: ActivatedRoute,
              private semanticService: SemanticService,
              private webStorage: WebStorageService,
              private quranService: QuranService) {
    this.SurahList = this.quranService.GetBaseSurahList();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log('params:', params);
      let BaseSurah = this.quranService.GetBaseSurahBySeq(+params['seq']);
      if (BaseSurah) {
        /* BASE */
        this.BaseSurah = BaseSurah;
        this.BaseItems = this.BaseSurah.Verses;
        this.CurrentPage = 1;
        // this.BasePagination.CurrentPage = 1;
        // console.log(this.BaseSurah);

        /* BETA */
        this.Surah = {Seq: this.BaseSurah.Seq, Name: this.BaseSurah.Name, Verses: [] as IVerse[]};
        BaseSurah.Verses.forEach(verse => {
          let words: IWord[] = [];
          this.semanticService.ToWords(verse.Sentence, true).subscribe(testyWords => {
            words = testyWords;
          });

          this.Surah?.Verses.push({
            Seq: verse.Seq,
            // Arabic: verse.Sentence,
            // Pronunciation: words.map(x => x.L).join(' '),
            Words: words
          });
        });
        // console.log(this.Surah);
        this.BetaItems = this.Surah.Verses;
        this.CurrentPage = 1;
        // this.BetaPagination.CurrentPage = 1;

        /* Surah List */
        // console.log(this.SurahList);
      }
    });

    if (this.webStorage.Get(StorageType.Local, 'Original')) {
      this.Original = this.webStorage.Get(StorageType.Local, 'Original') as boolean;
    }
    this.Detailed = this.webStorage.Get(StorageType.Local, 'Detailed') as boolean;
    this.Latin = this.webStorage.Get(StorageType.Local, 'Latin') as boolean;
    this.LatinIPA = this.webStorage.Get(StorageType.Local, 'LatinIPA') as boolean;
  }


  OnWordClick(word: IWord) {
    const detailed: any[] = [];
    word.Letters.forEach(letter => {
      let l: any = {
        Character: Arabic.Characters().find(x => x.Char.replace('◌', '') === letter.Ar),
        Unicode: Unicode.Ar.find(x => x.Char.replace('◌', '') === letter.Ar),
        IPA: IPA.Arabic.find(x => x.Char.replace('◌', '') === letter.Ar),
      };
      let abjad = Arabic.GetAbjad(letter.Ar);
      if (abjad) {
        l.Abjad = abjad;
      }
      detailed.push(l);

    });

    console.log(`Word |`, {...word, LettersPlus: detailed});
  }

  AbjadLetter = (char: string) => Arabic.GetAbjad(char)?.Value;

  AbjadWord(word: IWord) {
    let ebced = 0;
    word.Letters.filter(x => x.Type === CharType.Letter).forEach(w => ebced += this.AbjadLetter(w.Ar) ?? 0);
    return ebced;
  }

  GetRootOfWord(letters: ILetter[]): ILetter[] {
    // https://yazdirgac.blogspot.com/2013/06/arapca-kelimelerin-kokunu-bulma.html
    // TODO: 1) Kelimenin başındaki "m,t,s" harflerini atınız.
    // TODO: 2) Sondaki "at,in,un" gibi heceler varsa onları da çıkartınız.
    // TODO: 3) Peş peşe yazılmış aynı harften bir tanesini atınız.
    // TODO: 4) Sesli harflerin tümünü çıkarınız.
    // TODO: 5) Bütün bunları yaparken kelimenin kökünü 3 harften aşağı düşürmemeye özen gösteriniz.


    // [✓] | 2) Sondaki "at,in,un" gibi heceler varsa onları da çıkartınız.
    // [✓] | 3) Peş peşe yazılmış aynı harften bir tanesini atınız.
    // [✓] | 4) Sesli harflerin tümünü çıkarınız.
    let resRoots = letters.filter(x => x.Type === CharType.Letter);

    // TODO: 1) Kelimenin başındaki "m,t,s" harflerini atınız.
    if (['م', '', ''].indexOf(resRoots[0]?.Ar) > -1) {
      // console.log('GetRootOfWord() | start with "m,t,s"', resRoots);
    }

    // TODO: 5) Bütün bunları yaparken kelimenin kökünü 3 harften aşağı düşürmemeye özen gösteriniz.
    if (resRoots.length < 3) {
      // console.log('GetRootOfWord() | length < 3', resRoots);
    }


    // let roots = {
    //   Arabic: resRoots.map(x => x.Char.Latin?.Char).join(' '),
    //   Latin: resRoots.map(x => x.Char.Latin?.Transliteration).join(' '),
    //
    //   Letters: resRoots.map(x => ({Arabic: x.Arabic, Transliteration: x.Transliteration, Ebced: x.Char.Ebced})),
    // };
    // console.log('GetRootOfWord()', roots, resRoots);

    return resRoots;
  }

  OnFilter(value: string) {
    let res = this.quranService.GetBaseSurahList()?.filter(x => x.Name.toLowerCase().indexOf(value.toLowerCase()) > -1 || x.Seq === +value);

    if (res && res.length > 0) {
      this.SurahList = res;
    } else {
      this.SurahList = this.quranService.GetBaseSurahList();
    }
    // console.log(value, res);
  }

  OnFilterSurah(value: string) {
    let res: { Marker: string; Verses: IVerse[]; } = {Marker: value, Verses: []};
    // find ayat seq + mark words
    let directVerseNo = this.Surah?.Verses.find(x => x.Seq === +value);
    if (directVerseNo) {
      res.Verses.push(directVerseNo);
    }
    this.Surah?.Verses.forEach(verse => {
      if (verse.Words.filter(x => x.Latin.indexOf(value) > -1).length > 0) {
        res.Verses.push(verse);
      } else if (verse.Words.filter(x => x.Arabic.indexOf(value) > -1).length > 0) {
        res.Verses.push(verse);
      }
    });
    if (value && res && res.Verses.length > 0) {
      this.BetaItems = res.Verses;
    } else {
      this.BetaItems = this.Surah?.Verses ?? [];
    }
    // console.log('Filter', res.Verses);
  }

  OnChange(type: string) {
    if (type === 'Detailed') {
      this.Detailed = !this.Detailed;
      this.webStorage.Set(StorageType.Local, 'Detailed', this.Detailed, 600);
    } else if (type === 'Original') {
      this.Original = !this.Original;
      this.webStorage.Set(StorageType.Local, 'Original', this.Original, 600);
    } else if (type === 'Latin') {
      this.Latin = !this.Latin;
      this.webStorage.Set(StorageType.Local, 'Latin', this.Latin, 600);
    } else if (type === 'LatinIPA') {
      this.LatinIPA = !this.LatinIPA;
      this.webStorage.Set(StorageType.Local, 'LatinIPA', this.LatinIPA, 600);
    }
  }

  Variations(words: IWord[], way: string) {
    let wordList: string[] = [];

    words.forEach(word => {
      let latin = '';
      word.Letters.forEach(letter => {
        let ar = letter.Modified !== undefined ? letter.Modified : letter.Ar;
        if (way === 'Latin') {
          let char = Arabic.CharactersLatin().find(x => x.Char.replace('◌', '') === ar);
          if (letter.Latin) {
            latin += char ? char.Transliteration : '?';
          }
        }
        if (way === 'IPA') {
          let ipa = IPA.Arabic.find(x => x.Char.replace('◌', '') === ar);
          if (letter.Latin) {
            // latin += ipa ? ipa.IPA : letter.Transliteration;
            latin += letter.Latin && ipa ? ipa.IPA : '?';
          }
        }
      });
      wordList.push(latin);
    });

    return wordList;
  }

}
