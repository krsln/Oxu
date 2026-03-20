import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";

import {BaseSurah, ISurah} from "./Models";
import {StorageType, WebStorage} from '../Shared/services/Storage/web-storage';

@Injectable({
  providedIn: 'root'
})
export class QuranService {
  // https://github.com/Kristories/quran
  // https://raw.githubusercontent.com/Kristories/quran/master/fixtures/_original/source.json
  private jsonBase = document.baseURI + 'JSON';
  private jsonArabic = `${this.jsonBase}/source.json`;
  private jsonAnalysed = `${this.jsonBase}/Surahs.json`;


  // Surahs: BaseSurah[] = [];
  private _surahs: BehaviorSubject<BaseSurah[]> = new BehaviorSubject([] as BaseSurah[]);
  public readonly Surahs: Observable<BaseSurah[]> = this._surahs.asObservable();

  constructor(private http: HttpClient, private webStorage: WebStorage) {
    this.GetBaseSurahs().subscribe(() => {
      console.log('Quran Service | Loaded!');
    });
  }


  // Sync :p
  GetBaseSurahs(): Observable<BaseSurah[]> {
    let surahs = this.webStorage.Get(StorageType.Local, 'Surahs') as BaseSurah[];
    if (surahs && surahs.length > 0) {
      console.debug(`GetSurahs() | Get`, surahs.length);
      this._surahs.next(surahs);
      return of(surahs);
    } else {
      this.http.get(this.jsonArabic).subscribe(data => {
        let response = data as JsSurah[];
        surahs = this.jsonToQuran(response as JsSurah[]);
        this.webStorage.Set(StorageType.Local, 'Surahs', surahs, 600); // 6h

        console.debug(`GetSurahs() | Set`, surahs.length);
        this._surahs.next(surahs);
        return surahs;
      });
    }
    return of(surahs);
  }

  // Sync :p
  GetSurahs(): Observable<ISurah[]> {
    return this.http.get<ISurah[]>(this.jsonAnalysed);
  }

  Info() {
    let surahs = this._surahs.getValue();
    let verseCounts = surahs.map(x => x.Verses.length);
    let verseCountTotal = verseCounts?.reduce((partialSum, a) => partialSum + a, 0);

    let wordCount = 0;
    let letterCount = 0;
    surahs?.map(x => x.Verses).forEach(verses => {
      wordCount += verses.map(x => x.Words.length).reduce((partialSum, a) => partialSum + a, 0);

      let l1Counts = verses.map(x => x.Words.map(z => z.length).reduce((partialSum, a) => partialSum + a, 0));
      letterCount += l1Counts.reduce((partialSum, a) => partialSum + a, 0);
    });
    console.log('Surahs: ', surahs.length, '\tVerses: ', verseCountTotal, '\tWords: ', wordCount, '\tLetters: ', letterCount);
  }

  GetBaseSurahBySeq(seq: number): BaseSurah | undefined {
    let surahs = this._surahs.getValue();
    if (surahs.length === 0) {
      surahs = this.webStorage.Get(StorageType.Local, 'Surahs') as BaseSurah[];
    }

    console.debug(`GetSurahBySeq(${seq})`, surahs?.length);
    return surahs?.find(x => x.Seq === seq);
  }

  GetBaseSurahList(): { Count: number; Seq: number; Name: string }[] | undefined {
    let surahs = this._surahs.getValue();
    if (surahs.length === 0) {
      surahs = this.webStorage.Get(StorageType.Local, 'Surahs') as BaseSurah[];
    }
    let res = surahs?.map(x => ({Seq: x.Seq, Name: x.Name, Count: x.Verses.length}));

    console.debug(`GetSurahNames()`, res?.length);
    return res;
  }

  // Async
  GetSurahsAsync() {
  }

  GetSurahBySeqAsync() {
  }

  private jsonToQuran(jsSurahs: JsSurah[]): BaseSurah[] {
    let response: BaseSurah[] = [];
    if (jsSurahs && jsSurahs.length > 0) {

      jsSurahs.forEach(surah => {
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
  //     Surahs: BaseSurah[];
  //     ExpirationDate: Date | string;
  //   };
  //   if (!!data && data.Surahs) {
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
  //     this.webStorage.Set(StorageType.Local, 'Quran', {Surahs: listSurah, ExpirationDate: ExpDate}, 3); // 6h
  //     this._surahs.next(listSurah);
  //     // this.Surahs = listSurah;
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
  //     // baseSurah = this.Surahs.find(surah => surah.Seq === seq);
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
