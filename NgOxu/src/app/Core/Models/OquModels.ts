// ****************************

export interface IWord {
  Arabic: string; // Arabic
  Latin: string; // Pronunciation | Latin

  Letters: ILetter[];
}

export interface ILetter {
  Type: CharType; // Type

  Ar: string; // Arabic
  Latin: string;  // Pronunciation | Latin
  Modified?: string; // Modified

  Pattern?: string;
}

export interface ICharacter {
  UCS: string; // UCS, Unicode: Universal Coded Character Set | UTF: Unicode Transformation Format

  Char: string,
  Transliteration: string;
  Name: string,

  Type: CharType;
  Diacritic?: DiacriticType;
}

// ****************************

export interface IRule {
  Type: string;
  Name: string;
  Value: string;

  Rule: string;
  Pattern: string;

  Desc: string;
}


export interface IUnicode {
  UCS: string; // UCS, Unicode: Universal Coded Character Set | UTF: Unicode Transformation Format
  Char: string;
  Category: string;
  Name: string;
}

export interface IAbjad {
  Char: string;
  Name: string;
  Value: number;
}

// ****************************
// Hareke => Ḥarakāt https://tr.wikipedia.org/wiki/Hareke
export interface INavigation {
  Navigation: { Index: number; Length: number; Word: string; };
  Current: {
    Char?: string;
    Type: CharType;
    Diacritic: DiacriticType;

    Hareke: HarakatType;
    Harekesiz: boolean;
  },

  Prev: {
    Char?: string;
    Type: CharType;
    Diacritic: DiacriticType;

    Hareke: HarakatType;

    Prev: {
      Char?: string;
      Type: CharType;
      Diacritic: DiacriticType;
    }
  },

  Next: {
    Char?: string;
    Type: CharType;
    Diacritic: DiacriticType;

    Hareke: HarakatType;
    Harekesiz: boolean;

    Next: {
      Char?: string;
      Type: CharType;
      Diacritic: DiacriticType;
    }
  }
}

// ****************************

export enum CharType {
  Unknown,
  Number,

  Letter,

  // Punctuation, // Noktalama işaretleri
  Diacritic, // Arabic Diacritics https://en.wikipedia.org/wiki/Arabic_diacritics
  Secavend, // Quranic punctuation | Kur'an'daki duraklama işaretleri https://en.wikipedia.org/wiki/Qur%27anic_punctuation
  Tatweel, // [Kashida or Kasheeda || Tatweel or Tatwīl]  https://en.wikipedia.org/wiki/Kashida

  // Others ?
}

// Arabic Diacritics (Aksan işaretleri) https://en.wikipedia.org/wiki/Arabic_diacritics
export enum DiacriticType {
  Unknown,
  // Tashkil (marks used as phonetic guides)
  Sukun,// | '◌ْ' or '◌ۡ' | Sukūn
  Shaddah, //  |'◌ّ' | Shaddah (consonant gemination mark)
  Harakat, // Fatḥah, Kasrah, Ḍammah, Alif Khanjariyah (dik üstün) | Harakat (short vowel marks)
  Tanwin,// | '◌ً','◌ٌ', | TODO: |  ٌ  ٍ  ً   |  Nunation | Tanwin (final postnasalized or long vowels)
  Maddah,// '◌ٓ' | 'آ' |
  Wasla, // Alif waslah | 'ٱ' |
  // |ئ  ؤ  إ  أ ء| Hamza (glottal stop semi-consonant)
  HamzaLetter,
  Hamza,
  // Tone Markers
  Harbay,// Hārbāy  ◌࣪ / ◌࣭
  Tela,// Ṭelā  ◌࣫ / ◌࣮     https://www.compart.com/en/unicode/U+08EE
  Tana, // Ṭāna  ◌࣬ / ◌࣯
  //********************************************////********************************************//
}

export enum HarakatType {
  Fatha, // Üstün
  Kasra, // Esre
  Damma, // Ötre
  AlifKhanjariyah, // Dik üstün


  Fathatan, // Üstün
  Kasratan, // Esre
  Dammatan, // Ötre
}
