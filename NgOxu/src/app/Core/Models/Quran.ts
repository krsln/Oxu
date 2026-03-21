import {IWord} from "./OquModels";

// ****************************

export interface BaseSurah {
  Seq: number;
  Name: string;

  Verses: BaseVerse[];
}

export interface BaseVerse {
  Seq: number;
  Sentence: string;

  Words: string[];
}

// ****************************
// ****************************

export interface IQuran {
  // Source: string;
  SurahList: ISurah[];
}

export interface ISurah {
  Seq: number;
  Name: string;

  Verses: IVerse[];
}

export interface IVerse {
  Seq: number;

  // Arabic: string;
  // Pronunciation: string;

  Words: IWord[];
}

