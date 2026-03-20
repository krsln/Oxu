import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SemanticService} from "../../../../Core/SemanticService";
import {ILetter, IQuran, ISurah, IVerse, IWord} from "../../../../Core/Models";
import {QuranService} from "../../../../Core/quran.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {PrettyJsonPipe} from '../../../../Core/pretty-json.pipe';

@Component({
  selector: 'app-test',
  imports: [
    PrettyJsonPipe, CommonModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './test.html',
  styleUrl: './test.scss',
})
export class Test implements OnInit{

  Besmele = 'بِسْمِاللَّهِالرَّحْمَـٰنِالرَّحِيمِ';
  Letters: ILetter[] = [];
  Surah: ISurah | undefined;
  Surahs: ISurah[] = [];

  constructor(private quranService: QuranService,
              private sanitizer: DomSanitizer,
              private semanticService: SemanticService) {

  }

  ngOnInit(): void {
    this.semanticService.ToWords(this.Besmele).subscribe(data => {
      this.Letters = data[0].Letters;
    });

    // console.log(this.semanticService.ToLetters('الْقُرْآن'));


    // this.quranService.GetBaseSurahs().subscribe(surahs => {
    //   surahs?.forEach(baseSurah => {
    //     if (baseSurah) {
    //       let surah = {Seq: baseSurah.Seq, Name: baseSurah.Name, Verses: [] as IVerse[]};
    //       baseSurah.Verses.forEach(verse => {
    //         let words: IWord[] = [];
    //         this.semanticService.ToWords(verse.Sentence, true).subscribe(testyWords => {
    //           words = testyWords;
    //         });
    //
    //         surah.Verses.push({
    //           Seq: verse.Seq,
    //           // Arabic: verse.Sentence,
    //           // Pronunciation: words.map(x => x.L).join(' '),
    //           Words: words
    //         });
    //       });
    //
    //       this.Surahs.push(surah);
    //     }
    //   });
    //   console.log('Surahs', this.Surahs);
    // });


    let BaseSurah = this.quranService.GetBaseSurahBySeq(1);
    if (BaseSurah) {
      let Surah = {Seq: BaseSurah.Seq, Name: BaseSurah.Name, Verses: [] as IVerse[]};
      BaseSurah.Verses.forEach(verse => {
        let words: IWord[] = [];
        this.semanticService.ToWords(verse.Sentence, true).subscribe(testyWords => {
          words = testyWords;
        });

        Surah?.Verses.push({
          Seq: verse.Seq,
          // Arabic: verse.Sentence,
          // Pronunciation: words.map(x => x.L).join(' '),
          Words: words
        });
      });
      this.Surah = Surah;
    }
    // this.TEST();
  }

  get dataAllUri(): SafeUrl {
    const jsonData = JSON.stringify(this.Surahs);
    const uri = 'data:application/json;charset=UTF-8,' + encodeURIComponent(jsonData);
    return this.sanitizer.bypassSecurityTrustUrl(uri);
  }

  get dataUri(): SafeUrl {
    const jsonData = JSON.stringify(this.Surah);
    const uri = 'data:application/json;charset=UTF-8,' + encodeURIComponent(jsonData);
    return this.sanitizer.bypassSecurityTrustUrl(uri);
  }

  TEST() {
    let test1 = "بِسْمِ اللّهِ الرَّحْمَنِ الرَّحِيمِ"; // besmele
    test1 = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ";
    // test1 = "";

    // const results = test1.split(' ').map(x => this.Semantic.ToWords(x));
    // console.log('TEST()', results);

    const tests: any = [
      // {Test: 'Tenvin | Fathatan',},
      // {Arabic: 'مَدْرَسَةً', Latin: 'medreseten', Result: ''},
      // {Arabic: 'اَزْوَاجًا', Latin: 'ezvacen', Result: ''},
      // {Arabic: 'قَرْيَةً', Latin: 'karyeten', Result: ''},
      // {Arabic: 'كَثيرًا', Latin: 'kesiran', Result: ''},
      //
      // {Test: 'Tenvin | Kesretan',},
      // {Arabic: 'بَعْضٍ', Latin: 'Ba’din', Result: ''},
      // {Arabic: 'يَوْمٍ', Latin: 'yavmin', Result: ''},
      // {Arabic: 'قُوَّةٍ', Latin: 'kuvvatin', Result: ''},
      // {Arabic: 'شَدِيدٍ', Latin: 'şedidin', Result: ''},
      //
      // {Test: 'Tenvin | Dammetan',},
      // {Arabic: 'مُصِيبَةٌ', Latin: 'musibetun', Result: ''},
      // {Arabic: 'جُنَاحٌ', Latin: 'cunahun', Result: ''},
      // {Arabic: 'حَسَنَةٌ', Latin: 'hasenetun', Result: ''},
      // // {Arabic: '', Latin: '', Result: ''},


      // {Test: 'Elif-i Maksure'},  // https://www.arapcadeposu.com/arapca-dil-bilgisi-elif-maksure/
      // {Arabic: 'كُبْرَى', Latin: '', Result: ''},
      // {Arabic: 'سَلْمَى', Latin: '', Result: ''},
      // {Arabic: 'طُوبَى', Latin: '', Result: ''},

      // {Test: 'Med | Elif'},
      // {Arabic: 'قَالَ', Latin: 'qâle', Result: ''},
      // {Arabic: 'جَاهَدَ', Latin: 'câhede', Result: ''},
      // {Arabic: 'غَالِبَ', Latin: 'gâlibe', Result: ''},
      // {Arabic: 'كَانَ', Latin: 'Kâne', Result: ''},
      //
      // {Test: 'Med | Ye'},
      // {Arabic: 'نُزِيقُ', Latin: 'nuzîqu', Result: ''},
      // {Arabic: 'اَلَّذِينَ', Latin: 'ellezîne', Result: ''},
      // {Arabic: 'تَجْرِى', Latin: 'tecrî', Result: ''},
      // {Arabic: 'يُرِيدُ', Latin: 'yurîdu', Result: ''},
      //
      // {Test: 'Med | waw'},
      // {Arabic: 'اُوتِىَ', Latin: 'ûtiye', Result: ''},
      // {Arabic: 'يَصُدُّونَ', Latin: 'yasuddûne', Result: ''},
      // {Arabic: 'اَعُوذُ', Latin: 'Eû’zu', Result: ''},
      // {Arabic: 'يَقُولُ', Latin: 'yeqûlu', Result: ''},


      {Test: 'Dik Ustun'},
      {Arabic: 'اٰمَنَ', Latin: '', Result: ''},
      {Arabic: 'ھٰھُنَا', Latin: '', Result: ''},
      {Arabic: 'غَدٰوةَ', Latin: '', Result: ''},
      {Arabic: 'اُخْرٰى', Latin: '', Result: ''},
      // {Arabic: '', Latin: '', Result: ''},

      // {Test: 'Dik Esre'},
      // {Arabic: 'حَآفّٖينَ', Latin: '', Result: ''},
      // {Arabic: 'آٰمّٖينَ', Latin: '', Result: ''},
      // {Arabic: 'جٖىٓءَ', Latin: '', Result: ''},
      // // {Arabic: '', Latin: '', Result: ''},

    ];
    tests.forEach((x: { Arabic: string; Result: string; Letters: ILetter[]; }) => {
      if (x.Arabic) {
        let letters = this.semanticService.ToLetters(x.Arabic);
        x.Result = letters.map(l => l.Latin).join('');
        x.Letters = letters;
      }
    });
    console.log(tests);

  }
}
