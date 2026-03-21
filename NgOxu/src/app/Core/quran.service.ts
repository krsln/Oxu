import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

import {BaseSurah} from "./Models";
import {StorageType, WebStorageService} from '../Shared/services/Storage/web-storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuranService {

  // SurahList: BaseSurah[] = [];
  private _surahList: BehaviorSubject<BaseSurah[]> = new BehaviorSubject([] as BaseSurah[]);
  public readonly SurahList: Observable<BaseSurah[]> = this._surahList.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(PLATFORM_ID) private platformId: any,
              private http: HttpClient, private webStorage: WebStorageService) {
    // console.log('isPlatformBrowser', isPlatformBrowser(this.platformId), this.document);
    if (isPlatformBrowser(this.platformId)) {
      // https://github.com/Kristories/quran
      // https://raw.githubusercontent.com/Kristories/quran/master/fixtures/_original/source.json
      let jsonBase = this.document.baseURI + 'JSON';
      let jsonArabic = `${jsonBase}/source.json`;
      // let jsonAnalysed = `${this.jsonBase}/SurahList.json`;

      this.LoadInitialData(jsonArabic).subscribe(() => {
        console.log('Quran Service | Loaded!');
      });
    }
  }


  // Sync :p
  LoadInitialData(jsonUrl: string): Observable<BaseSurah[]> {
    let surahList = this.webStorage.Get(StorageType.Local, 'SurahList') as BaseSurah[];
    if (surahList && surahList.length > 0) {
      console.debug(`LoadInitialData() | Get`, surahList.length);
      this._surahList.next(surahList);
      return of(surahList);
    } else {
      this.http.get(jsonUrl).subscribe(data => {
        let response = data as JsSurah[];
        surahList = this.jsonToQuran(response as JsSurah[]);
        this.webStorage.Set(StorageType.Local, 'SurahList', surahList, 600); // 6h

        console.debug(`LoadInitialData() | Set`, surahList.length);
        this._surahList.next(surahList);
        return surahList;
      });
    }
    return of(surahList);
  }

  // Sync :p
  // LoadSurahAnalysed(): Observable<ISurah[]> {
  //   return this.http.get<ISurah[]>(this.jsonAnalysed);
  // }

  Info() {
    let surahList = this._surahList.getValue();
    let verseCounts = surahList.map(x => x.Verses.length);
    let verseCountTotal = verseCounts?.reduce((partialSum, a) => partialSum + a, 0);

    let wordCount = 0;
    let letterCount = 0;
    surahList?.map(x => x.Verses).forEach(verses => {
      wordCount += verses.map(x => x.Words.length).reduce((partialSum, a) => partialSum + a, 0);

      let l1Counts = verses.map(x => x.Words.map(z => z.length).reduce((partialSum, a) => partialSum + a, 0));
      letterCount += l1Counts.reduce((partialSum, a) => partialSum + a, 0);
    });
    console.log('SurahList: ', surahList.length, '\tVerses: ', verseCountTotal, '\tWords: ', wordCount, '\tLetters: ', letterCount);
  }

  GetBaseSurahBySeq(seq: number): BaseSurah | undefined {
    let surahList = this._surahList.getValue();
    if (surahList.length === 0) {
      surahList = this.webStorage.Get(StorageType.Local, 'SurahList') as BaseSurah[];
    }

    console.debug(`GetSurahBySeq(${seq})`, surahList?.length);
    return surahList?.find(x => x.Seq === seq);
  }

  GetBaseSurahList(): { Count: number; Seq: number; Name: string }[] | undefined {
    let surahList = this._surahList.getValue();
    if (surahList.length === 0) {
      surahList = this.webStorage.Get(StorageType.Local, 'SurahList') as BaseSurah[];
    }
    let res = surahList?.map(x => ({Seq: x.Seq, Name: x.Name, Count: x.Verses.length}));

    console.debug(`GetSurahNames()`, res?.length);
    return res;
  }

  // // Async
  // GetSurahListAsync() {
  // }
  //
  // GetSurahBySeqAsync() {
  // }

  private jsonToQuran(jsSurahList: JsSurah[]): BaseSurah[] {
    let response: BaseSurah[] = [];
    if (jsSurahList && jsSurahList.length > 0) {

      jsSurahList.forEach(surah => {
        let baseSurah = {Source: 'JSON', Seq: surah.number, Name: surah.transliteration, Verses: []} as BaseSurah;
        surah.verses.forEach(verse => baseSurah.Verses.push({
          Seq: verse.number,
          Sentence: verse.content,

          Words: verse.content.split(' ')
        }));
        response.push(baseSurah);
      });
    }
    return response;
  }

  // private Timer: any;
  // async LoadInitialData() {
  //   // AutoLoad
  //   let data = this.webStorage.Get(StorageType.Local, 'Quran') as {
  //     SurahList: BaseSurah[];
  //     ExpirationDate: Date | string;
  //   };
  //   if (!!data && data.SurahList) {
  //     // console.log('QuranService | LoadQuran | AutoLoad');
  //     this.AutoUnload(data.ExpirationDate);
  //   }
  //   // Loader
  //   else {
  //     const response = await firstValueFrom(
  //       this.getJsonQuran().pipe(timeout(1000))
  //     );
  //
  //     let listSurah = this.jsonToQuran(response as JsSurah[]);
  //     // let ExpDate= new Date(new Date().getTime() + 60 * 1000) // 1min for test
  //     let ExpDate = new Date(new Date().getTime() + 60 * 60 * 6 * 1000); // 6h // 3600 1H
  //
  //     this.webStorage.Set(StorageType.Local, 'Quran', {SurahList: listSurah, ExpirationDate: ExpDate}, 3); // 6h
  //     this._surahList.next(listSurah);
  //     // this.SurahList = listSurah;
  //
  //     // console.log('QuranService | LoadQuran | Loader', response);
  //   }
  // }
  //
  // LoadSurahBySeq(seq: number): Observable<BaseSurah> {
  //   console.log('LoadSurahBySeq |', seq);
  //   let baseSurah: BaseSurah | undefined = this.webStorage.Get(StorageType.Local, `Surah-${seq}`) as BaseSurah;
  //
  //   if (!baseSurah) {
  //     // baseSurah = this.SurahList.find(surah => surah.Seq === seq);
  //     console.log('LoadSurahBySeq | getValue()', baseSurah);
  //     if (baseSurah) {
  //       // this.webStorage.Set(StorageType.Local, `Surah-${baseSurah.Seq}`, baseSurah, 60);
  //       console.log('LoadSurahBySeq | Set', baseSurah);
  //     } else {
  //       console.log('LoadSurahBySeq | TODO: not set value', baseSurah);
  //     }
  //   }
  //
  //   console.log('LoadSurahBySeq | Get', baseSurah);
  //
  //   return new Observable(subscriber => {
  //     subscriber.next(baseSurah);
  //     subscriber.complete();
  //   });
  // }
  //
  // private AutoUnload(ExpirationDate: Date | string) {
  //   let expireDate: Date = new Date();
  //   if (typeof ExpirationDate === 'string') {
  //     expireDate = new Date(ExpirationDate);
  //   } else if (typeof ExpirationDate === 'object') {
  //     expireDate = ExpirationDate;
  //   }
  //
  //   // console.log('QuranService | AutoUnload | Expires at =>', expireDate.toLocaleString());
  //
  //   const expDuration = expireDate.getTime() - new Date().getTime();
  //
  //   this.Timer = window.setTimeout(() => {
  //     console.log('QuranService | AutoUnloaded');
  //     this.Unload();
  //   }, expDuration);
  // }
  //
  // private getJsonQuran(): Observable<object> {
  //   return this.http.get(this.jsonPath);
  // }
  //

  //
  // private Unload(): void {
  //   console.log('QuranService | Unload');
  //   this.webStorage.Remove(StorageType.Local, 'Quran');
  //
  //   if (this.Timer) {
  //     window.clearTimeout(this.Timer);
  //     this.Timer = null;
  //   }
  // }

}

// Chapter - Surah
interface JsSurah {
  number: number;
  name: string;
  transliteration: string;
  // Verse - Āyah
  verses: {
    number: number;
    section: number;// Section - Juz'
    content: string;
  }[];
}
