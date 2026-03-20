// src: https://en.wikipedia.org/wiki/Arabic_(Unicode_block)
// src: https://en.wikipedia.org/wiki/Arabic_script_in_Unicode
import {CharType, DiacriticType, HarakatType, IAbjad, ICharacter} from "../Models";
import {Unicode} from "./Data/Unicode";

interface Typer {
  Id: string; // UCS
  Char: string;

  Type: CharType;
  Diacritic?: DiacriticType;
}

export class Arabic {

  static CharactersLatin(): ICharacter[] {
    // Base 28 letters
    const letters: ICharacter[] = [
      // https://web.uvic.ca/hrd/hist455/consonants/consonants_pres.htm
      {UCS: '0627', Char: 'ا', Type: CharType.Letter, Transliteration: 'ʾ', Name: '\'alif'},  // 'ʾ', 'ā'
      {UCS: '0628', Char: 'ب', Type: CharType.Letter, Transliteration: 'b', Name: 'Bā\''}, // 'b'
      {UCS: '062A', Char: 'ت', Type: CharType.Letter, Transliteration: 't', Name: 'Tā\''}, // 't'
      {UCS: '062B', Char: 'ث', Type: CharType.Letter, Transliteration: 'th', Name: 'Thā\''}, // 'th'
      {UCS: '062C', Char: 'ج', Type: CharType.Letter, Transliteration: 'j', Name: 'Jīm'}, // 'j'
      {UCS: '062D', Char: 'ح', Type: CharType.Letter, Transliteration: 'ḥ', Name: 'Ḥā\''}, // 'ḥ'
      {UCS: '062E', Char: 'خ', Type: CharType.Letter, Transliteration: 'kh', Name: 'Khā\''}, // 'kh'
      {UCS: '062F', Char: 'د', Type: CharType.Letter, Transliteration: 'd', Name: 'Dāl'}, // 'd'
      {UCS: '0630', Char: 'ذ', Type: CharType.Letter, Transliteration: 'dh', Name: 'Dhāl'}, // 'dh'
      {UCS: '0631', Char: 'ر', Type: CharType.Letter, Transliteration: 'r', Name: 'Rā\''}, // 'r'
      {UCS: '0632', Char: 'ز', Type: CharType.Letter, Transliteration: 'z', Name: 'Zāy'}, // 'z'
      {UCS: '0633', Char: 'س', Type: CharType.Letter, Transliteration: 's', Name: 'Sīn'}, // 's'
      {UCS: '0634', Char: 'ش', Type: CharType.Letter, Transliteration: 'sh', Name: 'Shīn'}, // 'sh'
      {UCS: '0635', Char: 'ص', Type: CharType.Letter, Transliteration: 'ṣ', Name: 'Ṣād'}, // 'ṣ'
      {UCS: '0636', Char: 'ض', Type: CharType.Letter, Transliteration: 'ḍ', Name: 'Ḍād'}, // 'ḍ'
      {UCS: '0637', Char: 'ط', Type: CharType.Letter, Transliteration: 'ṭ', Name: 'Ṭā\''}, // 'ṭ'
      {UCS: '0638', Char: 'ظ', Type: CharType.Letter, Transliteration: 'ẓ', Name: 'Ẓā\''}, // 'ẓ'
      {UCS: '0639', Char: 'ع', Type: CharType.Letter, Transliteration: 'ʕ', Name: 'ʕayn'}, // 'ʕ'
      {UCS: '063A', Char: 'غ', Type: CharType.Letter, Transliteration: 'gh', Name: 'Ghayn'}, // 'gh'
      {UCS: '0641', Char: 'ف', Type: CharType.Letter, Transliteration: 'f', Name: 'Fā\''}, // 'f'
      {UCS: '0642', Char: 'ق', Type: CharType.Letter, Transliteration: 'q', Name: 'Qāf'}, // 'q'
      {UCS: '0643', Char: 'ك', Type: CharType.Letter, Transliteration: 'k', Name: 'Kāf'}, // 'k'
      {UCS: '0644', Char: 'ل', Type: CharType.Letter, Transliteration: 'l', Name: 'Lām'}, // 'l'
      {UCS: '0645', Char: 'م', Type: CharType.Letter, Transliteration: 'm', Name: 'Mīm'}, // 'm'
      {UCS: '0646', Char: 'ن', Type: CharType.Letter, Transliteration: 'n', Name: 'Nūn'}, // 'n'
      {UCS: '0647', Char: 'ه', Type: CharType.Letter, Transliteration: 'h', Name: 'Hā\''}, // 'h'
      {UCS: '0648', Char: 'و', Type: CharType.Letter, Transliteration: 'w', Name: 'Wāw'}, // 'w', 'ū'
      {UCS: '064A', Char: 'ي', Type: CharType.Letter, Transliteration: 'y', Name: 'Yā\''}, // 'y', 'ī'
      {UCS: '0621', Char: 'ء', Type: CharType.Letter, Transliteration: '\'', Name: 'Hamza'}, // '\''

      {UCS: '', Char: '', Transliteration: '', Type: CharType.Letter, Name: ''} as ICharacter,

    ];

    const diacritic = CharType.Diacritic;
    const harakat = DiacriticType.Harakat;
    const maddah = DiacriticType.Maddah;
    const wasla = DiacriticType.Wasla;
    const sukun = DiacriticType.Sukun;
    const tanwin = DiacriticType.Tanwin;
    const shaddah = DiacriticType.Shaddah;
    const hamzaLetter = DiacriticType.HamzaLetter;
    const hamza = DiacriticType.Hamza;

    //**// Punctuation | Noktalama işaretleri
    // Arabic Diacritics https://en.wikipedia.org/wiki/Arabic_diacritics
    const diacritics: ICharacter[] = [
      // @formatter:off
      // Tashkil (marks used as phonetic guides)
      // Harakat, // Fatḥah, Kasrah, Ḍammah, Alif Khanjariyah (dik üstün) | Harakat (short vowel marks)
      {UCS: '064E', Char: '◌َ', Type: diacritic, Diacritic: harakat, Transliteration: 'a', Name: 'Fatḥah'} as ICharacter,
      {UCS: '0650', Char: '◌ِ', Type: diacritic, Diacritic: harakat, Transliteration: 'i', Name: 'Kasrah'} as ICharacter,
      {UCS: '064F', Char: '◌ُ', Type: diacritic, Diacritic: harakat, Transliteration: 'u', Name: 'Ḍammah'} as ICharacter,
      {UCS: '0670', Char: '◌ٰ', Type: diacritic, Diacritic: harakat, Transliteration: 'aː', Name: 'Alif Khanjariyah'} as ICharacter, // ARABIC LETTER SUPERSCRIPT ALEF

      // Maddah,// '◌ٓ' | 'آ' |
      {UCS: '0653', Char: '◌ٓ', Type: diacritic, Diacritic: maddah, Transliteration:'ʔ', Name: 'MADDAH ABOVE'} as ICharacter,
      {UCS: '0622', Char: 'آ',  Type: diacritic, Diacritic: maddah, Transliteration:'ʔ', Name: 'LETTER - ALEF WITH MADDA ABOVE'} as ICharacter,

      // Wasla, // Alif waslah | 'ٱ' |
      {UCS: '0671', Char: 'ٱ', Type: diacritic, Diacritic: wasla, Transliteration:'-', Name: 'LETTER - ALEF WASLA'} as ICharacter,

      // Sukun,// | '◌ْ' or '◌ۡ' | Sukūn
      {UCS: '0652', Char: '◌ْ', Type: diacritic, Diacritic: sukun, Transliteration:'', Name: 'Sükûn | Cezm'} as ICharacter,
      {UCS: '06E1', Char: '◌ۡ', Type: diacritic, Diacritic: sukun, Transliteration:'', Name: 'SMALL HIGH DOTLESS HEAD OF KHAH'} as ICharacter,

      // |ئ  ؤ  إ  أ ء| Hamza (glottal stop semi-consonant)
      // https://en.wikipedia.org/wiki/Hamza
      {UCS: '0623', Char: 'أ', Type: diacritic, Diacritic: hamzaLetter, Transliteration: 'e', Name: 'LETTER ALEF WITH HAMZA ABOVE'},// Hemzeli elif
      {UCS: '0625', Char: 'إ', Type: diacritic, Diacritic: hamzaLetter, Transliteration: 'i', Name: 'LETTER ALEF WITH HAMZA BELOW'}, // Hemzeli elif
      {UCS: '0624', Char: 'ؤ', Type: diacritic, Diacritic: hamzaLetter, Transliteration: 'u', Name: 'LETTER WAW WITH HAMZA ABOVE'},// Hemzeli vav
      {UCS: '0626', Char: 'ئ', Type: diacritic, Diacritic: hamzaLetter, Transliteration: 'i', Name: 'LETTER YEH WITH HAMZA ABOVE'},// Hemzeli ye
      {UCS: '0621', Char: 'ء', Type: diacritic, Diacritic: hamzaLetter, Transliteration: '\'', Name: 'LETTER HAMZA'},// Hemze | Tek başına

      // Others?
      {UCS: '', Char: '', Type: diacritic, Diacritic: DiacriticType.Harakat, Name: ''} as ICharacter,

      // @formatter:on
    ];


    let characters: ICharacter[] = [
      ...letters, ...diacritics,  //...secavends, ...tatweels, ...others
    ].filter(x => x.Char.length > 0);

    characters.forEach(char => {
      if (!char.UCS || char.UCS.length === 0) {
        console.log('Character() | UCS: undefined', char);
      }
    });

    return characters;
  }

  static Characters(): ICharacter[] {

    // Base 28 letters
    const lettersTR: ICharacter[] = [
      // https://tr.wikipedia.org/wiki/Arap_harfleri
      {UCS: '0627', Char: 'ا', Type: CharType.Letter, Transliteration: 'ʾ', Name: 'elif'}, // 'ʾ', 'ā'
      {UCS: '0628', Char: 'ب', Type: CharType.Letter, Transliteration: 'b', Name: 'be'}, // 'b'
      {UCS: '062A', Char: 'ت', Type: CharType.Letter, Transliteration: 't', Name: 'te'}, // 't'
      {UCS: '062B', Char: 'ث', Type: CharType.Letter, Transliteration: 'ṯ', Name: 's̠e'}, // 'ṯ', 'th', 'θ'
      {UCS: '062C', Char: 'ج', Type: CharType.Letter, Transliteration: 'c', Name: 'cīm'}, // 'ǧ', 'j', 'g'
      {UCS: '062D', Char: 'ح', Type: CharType.Letter, Transliteration: 'ḥ', Name: 'ḥā'}, // 'ḥ'
      {UCS: '062E', Char: 'خ', Type: CharType.Letter, Transliteration: 'ḫ', Name: 'ḫa'}, // 'ḫ', 'kh', 'x'
      {UCS: '062F', Char: 'د', Type: CharType.Letter, Transliteration: 'd', Name: 'dāl'}, // 'd'
      {UCS: '0630', Char: 'ذ', Type: CharType.Letter, Transliteration: 'ḏ', Name: 'z̠el'}, // 'ḏ', 'dh', 'ð'
      {UCS: '0631', Char: 'ر', Type: CharType.Letter, Transliteration: 'r', Name: 'ra'}, // 'r'
      {UCS: '0632', Char: 'ز', Type: CharType.Letter, Transliteration: 'z', Name: 'ze'}, // 'z'
      {UCS: '0633', Char: 'س', Type: CharType.Letter, Transliteration: 's', Name: 'sīn'}, // 's'
      {UCS: '0634', Char: 'ش', Type: CharType.Letter, Transliteration: 'ş', Name: 'şīn'}, // 'š', 'sh'
      {UCS: '0635', Char: 'ص', Type: CharType.Letter, Transliteration: 'ṣ', Name: 'ṣād'}, // 'ṣ'
      {UCS: '0636', Char: 'ض', Type: CharType.Letter, Transliteration: 'ḍ', Name: 'ḍād'}, // 'ḍ'
      {UCS: '0637', Char: 'ط', Type: CharType.Letter, Transliteration: 'ṭ', Name: 'ṭā'}, // 'ṭ'
      {UCS: '0638', Char: 'ظ', Type: CharType.Letter, Transliteration: 'ẓ', Name: 'ẓa'}, // 'ẓ'
      {UCS: '0639', Char: 'ع', Type: CharType.Letter, Transliteration: 'ʿ', Name: 'ayn'}, // 'ʿ'
      {UCS: '063A', Char: 'غ', Type: CharType.Letter, Transliteration: 'ġ', Name: 'gayn'}, // 'ġ', 'gh'
      {UCS: '0641', Char: 'ف', Type: CharType.Letter, Transliteration: 'f', Name: 'fe'}, // 'f'
      {UCS: '0642', Char: 'ق', Type: CharType.Letter, Transliteration: 'q', Name: 'kāf'}, // 'q'
      {UCS: '0643', Char: 'ك', Type: CharType.Letter, Transliteration: 'k', Name: 'kef'}, // 'k'
      {UCS: '0644', Char: 'ل', Type: CharType.Letter, Transliteration: 'l', Name: 'lām'}, // 'l'
      {UCS: '0645', Char: 'م', Type: CharType.Letter, Transliteration: 'm', Name: 'mīm'}, // 'm'
      {UCS: '0646', Char: 'ن', Type: CharType.Letter, Transliteration: 'n', Name: 'nūn'}, // 'n'
      {UCS: '0647', Char: 'ه', Type: CharType.Letter, Transliteration: 'h', Name: 'he'}, // 'h'
      {UCS: '0648', Char: 'و', Type: CharType.Letter, Transliteration: 'w', Name: 'vāv'}, // 'w', 'ū'
      {UCS: '064A', Char: 'ي', Type: CharType.Letter, Transliteration: 'y', Name: 'ye'}, // 'y', 'ī'

      {UCS: '', Char: '', Type: CharType.Letter, Transliteration: '', Name: ''} as ICharacter,

    ];

    // Other letter?
    const lettersOther = [
      {UCS: '0629', Char: 'ة', Type: CharType.Letter, Transliteration: 't', Name: 'tāʾ marbūṭah'},
      {UCS: '0649', Char: 'ى', Type: CharType.Letter, Transliteration: 'y', Name: 'ʾalif maqṣūrah | Elif-i Maksure'},
      {UCS: '06BE', Char: 'ھ', Type: CharType.Letter, Transliteration: 'h', Name: 'HEH DOACHASHMEE'},

      // {UCS: '', Char: 'ک', Transliteration: 'k', Name: 'kef'}, // KEHEH
      // {UCS: '', Char: 'ہ', Transliteration: 'h', Name: 'he?'},
      // {UCS: '', Char: 'ی', Transliteration: 'y', Name: 'ye?'},

      {UCS: '', Char: '', Type: CharType.Letter, Transliteration: '', Name: ''} as ICharacter,
    ];

    const letters = [...lettersTR, ...lettersOther];

    const diacritic = CharType.Diacritic;
    const harakat = DiacriticType.Harakat;
    const maddah = DiacriticType.Maddah;
    const wasla = DiacriticType.Wasla;
    const sukun = DiacriticType.Sukun;
    const tanwin = DiacriticType.Tanwin;
    const shaddah = DiacriticType.Shaddah;
    const hamzaLetter = DiacriticType.HamzaLetter;
    const hamza = DiacriticType.Hamza;

    //**// Punctuation | Noktalama işaretleri
    // Arabic Diacritics https://en.wikipedia.org/wiki/Arabic_diacritics
    const diacritics: ICharacter[] = [
      // @formatter:off
      // Tashkil (marks used as phonetic guides)
      // Harakat, // Fatḥah, Kasrah, Ḍammah, Alif Khanjariyah (dik üstün) | Harakat (short vowel marks)
      {UCS: '064E', Char: '◌َ', Type: diacritic, Diacritic: harakat, Name: 'Fatḥah | Üstün'} as ICharacter,
      {UCS: '0618', Char: '◌ؘ', Type: diacritic, Diacritic: harakat, Name: 'Small Kasrah'} as ICharacter,
      {UCS: '0650', Char: '◌ِ', Type: diacritic, Diacritic: harakat, Name: 'Kasrah | Esre'} as ICharacter,
      {UCS: '061A', Char: '◌ؚ', Type: diacritic, Diacritic: harakat, Name: 'Small Kasrah'} as ICharacter,
      {UCS: '064F', Char: '◌ُ', Type: diacritic, Diacritic: harakat, Name: 'Ḍammah | Ötre'} as ICharacter,
      {UCS: '0619', Char: '◌ؙ', Type: diacritic, Diacritic: harakat, Name: 'Small Ḍammah'} as ICharacter,
      {UCS: '0670', Char: '◌ٰ', Type: diacritic, Diacritic: harakat, Name: 'Alif Khanjariyah'} as ICharacter, // ARABIC LETTER SUPERSCRIPT ALEF

      // Maddah,// '◌ٓ' | 'آ' |
      // TODO: ~ Harfin üzerine gelen yatay çizgi, üzerinde bulunduğu harfi dört elif miktarı uzatır.
      {UCS: '0653', Char: '◌ٓ', Type: diacritic, Diacritic: maddah, Name: 'MADDAH ABOVE'} as ICharacter,
      {UCS: '0622', Char: 'آ',  Type: diacritic, Diacritic: maddah, Name: 'LETTER - ALEF WITH MADDA ABOVE'} as ICharacter,

      // Wasla, // Alif waslah | 'ٱ' |
      {UCS: '0671', Char: 'ٱ', Type: diacritic, Diacritic: wasla, Name: 'LETTER - ALEF WASLA'} as ICharacter,

      // Sukun,// | '◌ْ' or '◌ۡ' | Sukūn
      {UCS: '0652', Char: '◌ْ', Type: diacritic, Diacritic: sukun, Name: 'Sükûn | Cezm'} as ICharacter,
      {UCS: '06E1', Char: '◌ۡ', Type: diacritic, Diacritic: sukun, Name: 'SMALL HIGH DOTLESS HEAD OF KHAH'} as ICharacter,

      // Tanwin,// | '◌ً','◌ٌ', | TODO: |  ٌ  ٍ  ً   |  Nunation | Tanwin (final postnasalized or long vowels)
      {UCS: '064B', Char: '◌ً', Type: diacritic, Diacritic: tanwin, Name: 'Fethatân | iki üstün'} as ICharacter,
      {UCS: '064C', Char: '◌ٌ', Type: diacritic, Diacritic: tanwin, Name: 'Dammetân | iki ötre'} as ICharacter,
      {UCS: '064D', Char: '◌ٍ', Type: diacritic, Diacritic: tanwin, Name: 'Kesretân | iki esre'} as ICharacter,

      // Shaddah, //  |'◌ّ' | Shaddah (consonant gemination mark)
      {UCS: '0651', Char: '◌ّ',Type: diacritic, Diacritic: shaddah, Name: 'Şedde'} as ICharacter,

      // |ئ  ؤ  إ  أ ء| Hamza (glottal stop semi-consonant)
      // https://en.wikipedia.org/wiki/Hamza
      {UCS: '0623', Char: 'أ', Type: diacritic, Diacritic: hamzaLetter, Transliteration: 'e', Name: 'LETTER ALEF WITH HAMZA ABOVE'},// Hemzeli elif
      {UCS: '0625', Char: 'إ', Type: diacritic, Diacritic: hamzaLetter, Transliteration: 'i', Name: 'LETTER ALEF WITH HAMZA BELOW'}, // Hemzeli elif
      {UCS: '0624', Char: 'ؤ', Type: diacritic, Diacritic: hamzaLetter, Transliteration: 'u', Name: 'LETTER WAW WITH HAMZA ABOVE'},// Hemzeli vav
      {UCS: '0626', Char: 'ئ', Type: diacritic, Diacritic: hamzaLetter, Transliteration: 'i', Name: 'LETTER YEH WITH HAMZA ABOVE'},// Hemzeli ye
      {UCS: '0621', Char: 'ء', Type: diacritic, Diacritic: hamzaLetter, Transliteration: '\'', Name: 'LETTER HAMZA'},// Hemze | Tek başına
      // TODO
      {UCS: '0654', Char: '◌ٔ', Type: diacritic, Diacritic: hamza, Transliteration: '', Name: 'ARABIC HAMZA ABOVE'},
      {UCS: '0655', Char: '◌ٕ', Type: diacritic, Diacritic: hamza, Transliteration: '', Name: 'ARABIC HAMZA BELOW'},


      // TODO: Tone markers | Harbay,Tela,Tana,
      // {UCS: '', Char: '◌࣪', Type: diacritic, Diacritic: DiacriticType.Harbay, Name: 'Hārbāy'} as ICharacter,
      // {UCS: '', Char: '◌࣭', Type: diacritic, Diacritic: DiacriticType.Harbay, Name: 'Hārbāy'} as ICharacter,
      // {UCS: '', Char: '◌࣫', Type: diacritic, Diacritic: DiacriticType.Tela, Name: 'Ṭelā'} as ICharacter,
      // {UCS: '', Char: '◌࣮', Type: diacritic, Diacritic: DiacriticType.Tela, Name: 'Ṭelā'} as ICharacter,
      // {UCS: '', Char: '◌࣫', Type: diacritic, Diacritic: DiacriticType.Tana, Name: 'Ṭāna'} as ICharacter,
      // {UCS: '', Char: '◌࣮', Type: diacritic, Diacritic: DiacriticType.Tana, Name: 'Ṭāna'} as ICharacter,

      // Others?
      {UCS: '', Char: '', Type: diacritic, Diacritic: DiacriticType.Harakat, Name: ''} as ICharacter,

      // @formatter:on
    ];

    // Quranic punctuation | Kur'an'daki duraklama işaretleri https://en.wikipedia.org/wiki/Qur%27anic_punctuation
    const secavends: ICharacter[] = [
      // https://suffagah.com/kuran-i-kerimdeki-durak-isaretleri-ve-anlamlari

      // Mim ('م')    Muhakkak durmalıdır. Durmak vâcibdir, durulmayıp geçilirse anlam bozulur.
      {UCS: '06D8', Char: '◌ۘ', Type: CharType.Secavend, Name: 'SMALL HIGH MEEM INITIAL FORM'} as ICharacter,

      // Tı ('ط')     Durmak gerekir.

      // Cim ('ج')    Geçmek de durmak da câizdir fakat durmak daha iyidir.
      {UCS: '06DA', Char: '◌ۚ', Type: CharType.Secavend, Name: 'SMALL HIGH JEEM'} as ICharacter,

      // Ze ('ز')     Geçmek de durmak da câizdir fakat geçmek daha iyidir.

      // Gaf ('ق')    Geçmek de durmak da câizdir fakat geçmek daha iyidir.

      // Lâmelif ('لا') Durulmaz! Bulunan yerde durulursa, önceki kelime ile birlikte tekrar okunur. Âyet-i kerime sonunda durunca, tekrar edilmez.
      {UCS: '06D9', Char: '◌ۙ', Type: CharType.Secavend, Name: 'SMALL HIGH LAM ALEF'} as ICharacter,

      // Gıf ('قف')   Durmak daha iyidir. (Gaf ile Fe’nin bitişik yazılışı)
      {
        UCS: '06D7', Char: '◌ۗ', Type: CharType.Secavend,
        Name: 'SMALL HIGH LIGATURE QAF WITH LAM WITH ALEF MAKSURA'
      } as ICharacter,

      // Sad ('ص')    Durmakta mahzur yoktur.

      // Sad-Lam-Ya ('صلي')  Geçmek daha iyidir.
      {
        UCS: '06D6', Char: '◌ۖ', Type: CharType.Secavend,
        Name: 'SMALL HIGH LIGATURE SAD WITH LAM WITH ALEF MAKSURA'
      } as ICharacter,

      // Üç nokta ('.:__:.') Bu üç noktanın birisinde durulur. Eğer üzerinde üç nokta bulunan birinci kelimede durulursa, üç nokta olan ikinci kelimede durulmaz.
      {UCS: '06DB', Char: '◌ۛ', Type: CharType.Secavend, Name: 'SMALL HIGH THREE DOTS'} as ICharacter,

      // Ayn ('ع')    Bazı âyet-i kerimelerin sonunda bulunur. Namazda okunursa bu işaret bulunan yerde rukûya gitmek iyi olur.

      // Kef ('ك')    Kezalik demektir. Kendisinden önce hangi secavent geçmişse, bu da öyle demektir.

      // Sīn ('س') or سكتة (sktẗ) - Sekte kısaltması. Nefes vermeden durmak gerekir. Sessizlik efekti verir.
      {UCS: '06DC', Char: '◌ۜ', Type: CharType.Secavend, Name: 'ARABIC SMALL HIGH SEEN'} as ICharacter, // Surah 83

      {UCS: '', Char: '', Type: CharType.Secavend, Name: ''} as ICharacter,
      {UCS: '', Char: '', Type: CharType.Secavend, Name: ''} as ICharacter,
    ];

    // [Kashida or Kasheeda || Tatweel or Tatwīl]  https://en.wikipedia.org/wiki/Kashida
    const tatweels: ICharacter[] = [
      {UCS: '0640', Char: 'ـ', Type: CharType.Tatweel, Name: 'Kasheeda | Tatwīl'} as ICharacter,
    ];

    // Others ?
    const others: ICharacter[] = [
      {UCS: '06E9', Char: '۩', Type: CharType.Unknown, Name: 'PLACE OF SAJDAH'} as ICharacter,
      {UCS: '', Char: '', Type: CharType.Unknown, Name: ''} as ICharacter,

    ];

    let characters: ICharacter[] = [...letters, ...diacritics, ...secavends, ...tatweels, ...others].filter(x => x.Char.length > 0);


    characters.forEach(char => {
      // char.Unicode = Unicode.Ar.find(x => x.Char.replace('◌', '') === char.Char.replace('◌', ''));

      if (!char.UCS || char.UCS.length === 0) {
        console.log('Character() | UCS: undefined', char);
      }
    });

    return characters;
  }

  // Tafkheem (Heavy)
  static IsHeavyLetters(char: string): boolean {
    // https://ehsanacademy.com/heavy-letters-in-arabic/
    // The Golden Rule for Raa ر is when Raa has Harakah on top it is pronounced with heavy voice
    // and when the letter Raa ر has a Harakah under it, it is pronounced as light letter.

    const heavyLetters = [
      // The heavy letters are seven: خ ص ض غ ط ق ظ
      {Char: 'خ', Transliteration: 'ḫ', Name: 'ḫa'},
      {Char: 'ص', Transliteration: 'ṣ', Name: 'ṣād'},
      {Char: 'ض', Transliteration: 'ḍ', Name: 'ḍād'},
      {Char: 'ط', Transliteration: 'ṭ', Name: 'ṭā (tı)'},
      {Char: 'ظ', Transliteration: 'ẓ', Name: 'ẓa (zı)'},
      {Char: 'غ', Transliteration: 'ġ', Name: 'gayn'},
      {Char: 'ق', Transliteration: 'q', Name: 'kāf'},

      // https://bayanulquran-academy.com/heavy-and-light-letters/
      // Ranking of Strength : ط (Ta) is the strongest, followed by ض (Dhaad), ص (Sad), ظ (Dha), ق (Qaf), غ (Ghayn), and خ (Kha).

      // {Char: '', Transliteration: '', Name: ''} ,
    ];

    let res = heavyLetters.find(x => x.Char === char);

    return res ? true : false;
  }

  static GetAbjad(char: string): IAbjad | undefined {
    const commonAbjadOrder: IAbjad[] = [
      // https://en.wikipedia.org/wiki/Abjad_numerals
      {Char: 'ا', Name: 'ʾalif', Value: 1} as IAbjad,
      {Char: 'ب', Name: 'bāʾ', Value: 2} as IAbjad,
      {Char: 'ج', Name: 'jīm', Value: 3} as IAbjad,
      {Char: 'د', Name: 'dāl', Value: 4} as IAbjad,
      {Char: 'ه', Name: 'hāʾ', Value: 5} as IAbjad,
      {Char: 'و', Name: 'wāw', Value: 6} as IAbjad,
      {Char: 'ز', Name: 'zāy/zayn', Value: 7} as IAbjad,
      {Char: 'ح', Name: 'ḥāʾ', Value: 8} as IAbjad,
      {Char: 'ط', Name: 'ṭāʾ', Value: 9} as IAbjad,

      {Char: 'ي', Name: 'yāʾ', Value: 10} as IAbjad,
      {Char: 'ك', Name: 'kāf', Value: 20} as IAbjad,
      {Char: 'ل', Name: 'lām', Value: 30} as IAbjad,
      {Char: 'م', Name: 'mīm', Value: 40} as IAbjad,
      {Char: 'ن', Name: 'nūn', Value: 50} as IAbjad,
      {Char: 'س', Name: 'sīn', Value: 60} as IAbjad,
      {Char: 'ع', Name: 'ʿayn', Value: 70} as IAbjad,
      {Char: 'ف', Name: 'fāʾ', Value: 80} as IAbjad,
      {Char: 'ص', Name: 'ṣād', Value: 90} as IAbjad,

      {Char: 'ق', Name: 'qāf', Value: 100} as IAbjad,
      {Char: 'ر', Name: 'rāʾ', Value: 200} as IAbjad,
      {Char: 'ش', Name: 'shīn', Value: 300} as IAbjad,
      {Char: 'ت', Name: 'tāʾ', Value: 400} as IAbjad,
      {Char: 'ث', Name: 'thāʾ', Value: 500} as IAbjad,
      {Char: 'خ', Name: 'khāʾ', Value: 600} as IAbjad,
      {Char: 'ذ', Name: 'dhāl', Value: 700} as IAbjad,
      {Char: 'ض', Name: 'ḍād', Value: 800} as IAbjad,
      {Char: 'ظ', Name: 'ẓāʾ', Value: 900} as IAbjad,

      {Char: 'غ', Name: 'ghayn', Value: 1000} as IAbjad,

      // {Unicode: undefined, Char: '', Name: '', Value: 666} as IAbjad,

    ];

    // For four Persian letters
    const forPersianLetters: IAbjad[] = [
      {Char: 'پ', Name: 'pe', Value: 2} as IAbjad,
      {Char: 'چ', Name: 'che', Value: 3} as IAbjad,
      {Char: 'ژ', Name: 'zhe', Value: 7} as IAbjad,
      {Char: 'گ', Name: 'gâf', Value: 20} as IAbjad,

      // {Unicode: undefined, Char: '', Name: '', Value: 666} as IAbjad,
    ];

    let res = [...commonAbjadOrder, ...forPersianLetters];

    res.forEach(x => {
      let check = Unicode.Ar.find(x => x.Char.replace('◌', '') === x.Char);
      if (!check) {
        console.log('GetAbjad() | Unicode: undefined', x, check);
      }
    });

    return res.find(x => x.Char === char);
  }

  static GetHarakatType(letter: string | undefined): HarakatType | undefined {
    // let hCharacters = this.Characters().filter(x => x.Type === CharType.Diacritic && x.Diacritic === DiacriticType.Harakat);
    let list = [
      {Char: '◌َ', Type: HarakatType.Fatha, Name: 'Fatḥah | Üstün'},
      {Char: '◌ؘ', Type: HarakatType.Fatha, Name: 'Small Fatḥah'},
      {Char: '◌ِ', Type: HarakatType.Kasra, Name: 'Kasrah | Esre'},
      {Char: '◌ؚ', Type: HarakatType.Kasra, Name: 'Small Kasrah'},
      {Char: '◌ُ', Type: HarakatType.Damma, Name: 'Ḍammah | Ötre'},
      {Char: '◌ؙ', Type: HarakatType.Damma, Name: 'Small Ḍammah'},
      {Char: '◌ٰ', Type: HarakatType.AlifKhanjariyah, Name: 'Alif Khanjariyah'}, // ARABIC LETTER SUPERSCRIPT ALEF


      {Char: '◌ً', Type: HarakatType.Fathatan, Name: 'Fethatân | iki üstün'},
      {Char: '◌ٌ', Type: HarakatType.Dammatan, Name: 'Dammetân | iki ötre'},
      {Char: '◌ٍ', Type: HarakatType.Kasratan, Name: 'Kesretân | iki esre'},
    ];

    return list.find(x => x.Char.replace('◌', '') === letter)?.Type;
  }

}

