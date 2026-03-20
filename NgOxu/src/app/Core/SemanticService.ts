import {CharType, DiacriticType, HarakatType, ICharacter, ILetter, INavigation, IRule, IWord} from "./Models";
import {Observable, of, Subject} from "rxjs";
import {Injectable} from "@angular/core";

import {Unicode} from "./Database/Data/Unicode";
import {Arabic} from "./Database/Arabic";
import {Rules, RuleResponse} from "./Rules";

@Injectable({
  providedIn: 'root'
})
export class SemanticService {

  // private Log = new Subject<string>();
  // private Rule = new Subject<IRule | undefined>();
  private Warning = new Subject<any[]>();

  constructor() {
    // this.Log.subscribe(x => console.debug('Regulator |', x));
    // this.Rule.subscribe(x => console.debug('Rule |', x));
    this.Warning.subscribe(x => console.warn('Warning |', ...x));
    // Logger.Rule.subscribe(x => console.debug('Rule |', x));
  }

  ToWords(sentence: string, fullStop: boolean = false): Observable<IWord[]> {
    const response: IWord[] = [];

    let prevLetters: ILetter[] = [];
    sentence.split(' ').forEach((word, index, array) => {
      let letters: ILetter[] = this.ToLetters(word, prevLetters);
      prevLetters = letters;
      // console.log('Letters', letters);

      /* https://kuran.diyanet.gov.tr/elifba/#/tecvid/vakf/kurallari
      * Vakfedilen kelimenin son harekesi “fetha, kesra, damme, iki kesra, iki damme” ise harekeler cezme dönüşür.
      * Son harfi şeddeli olan kelimelerde de aynı kural uygulanır.
      * Ancak şeddeli olması sebebiyle harf kısa bir süre tutulur.
      */
      // ۝ - Ayetlerin sonundadır. Bu işaretin içinde bitirilen ayetin numarası yazar.
      // Tam bir durduktan sonra, ayetin son harfi ünsüzse ünlüsünü kaybeder veya bir tenvinli elif ise tenvini uzatılmış bir elife dönüşür.
      if (fullStop && index === array.length - 1) {
        let type = letters[letters.length - 1].Type;
        if (type === CharType.Diacritic) {
          // console.log(Arabic.GetHarakatType(letters[letters.length - 1].Arabic));
          if (Arabic.GetHarakatType(letters[letters.length - 1].Ar) !== undefined) {
            letters[letters.length - 1].Latin = '';
          }
        }
      }

      response.push({
        Arabic: word, Latin: letters.map(x => x.Latin).join(''), Letters: letters
      } as IWord);
    });

    // console.log(response);
    return of(response);
  }

  ToLetters(word: string, prevLetters: ILetter[] = []): ILetter[] {
    let letters: ILetter[] = [];

    word.split('').forEach((letter, letterIndex, letterArray) => {
      let char = Arabic.Characters().find(x => x.Char.replace('◌', '') === letter);

      if (char) {
        let newLetter = {Type: char.Type, Ar: letter,} as ILetter;
        // if (char.Type === CharType.Letter) {
        //   newLetter.Abjad = Arabic.GetAbjad(char?.Char)?.Value;
        // }

        const character = {...char, Char: char.Char.replace('◌', '')};
        const Nav = this.FillNav(character, {Word: word, Index: letterIndex, Length: letterArray.length});

        let transliterate = this.Transliterate(character, Nav, prevLetters);
        if (newLetter.Ar !== transliterate.Ar) {
          newLetter.Modified = transliterate.Ar;
        }
        newLetter.Latin = transliterate.Latin;
        newLetter.Pattern = transliterate.Rule?.Pattern;

        letters.push(newLetter);
      } else {
        let unicode = Unicode.Ar.find(x => x.Char.replace('◌', '') === letter);
        console.log('Letter | Undefined', `\t\t\t${letter}\t\t\t`, unicode);
      }

    });

    // https://kuran.diyanet.gov.tr/elifba/#/tecvid/hurufu-mukattaa
    // Bazı sûrelerin başında harekesiz harfler yer alır.
    // Hurûf-u Mukattaa denilen bu harfler, harekesiz olmaları sebebiyle isimleriyle okunurlar.
    if (prevLetters.length === 0 && letters.every(x => x.Type === CharType.Letter)) {
      letters.forEach(letter => {
        letter.Latin = `${Arabic.Characters().find(x => x.Char === letter.Ar)?.Name} `;
      });
      // console.log('Special Surah | Hurûf-u Mukattaa', letters);
    }

    return letters;
  }

  FillNav(character: ICharacter, navigation: { Index: number; Length: number; Word: string; }): INavigation {
    const chars = Arabic.Characters();
    let prev = navigation.Index > 0 ? navigation.Word[navigation.Index - 1] : undefined;
    let prevPrev = navigation.Index > 1 ? navigation.Word[navigation.Index - 2] : undefined;
    let prevChar = chars.find(x => x.Char.replace('◌', '') === prev);
    let prevPrevChar = chars.find(x => x.Char.replace('◌', '') === prevPrev);

    let next = navigation.Length - 1 === navigation.Index ? undefined : navigation.Word[navigation.Index + 1];
    let nextNext = navigation.Length - 2 === navigation.Index ? undefined : navigation.Word[navigation.Index + 2];
    let nextChar = chars.find(x => x.Char.replace('◌', '') === next);
    let nextNextChar = chars.find(x => x.Char.replace('◌', '') === nextNext);

    let Harakat = [DiacriticType.Shaddah, DiacriticType.Sukun, DiacriticType.Harakat, DiacriticType.Tanwin,];
    let thisHasNoHareke = !nextChar?.Char || Harakat.indexOf(nextChar?.Diacritic ?? -1 as DiacriticType) === -1;
    let nextHasNoHareke = !nextNextChar?.Char || Harakat.indexOf(nextNextChar?.Diacritic ?? -1 as DiacriticType) === -1;

    let prevHarakatType = Arabic.GetHarakatType(prevChar?.Char.replace('◌', '')) ?? -1 as HarakatType;
    let nextHarakatType = Arabic.GetHarakatType(nextChar?.Char.replace('◌', '')) ?? -1 as HarakatType;

    let type = Arabic.GetHarakatType(character.Char) ?? -1 as HarakatType;

    const Nav = {
      Navigation: navigation,
      Current: {
        Char: character.Char,
        Type: character.Type,
        Diacritic: character.Diacritic,

        Hareke: type,
        Harekesiz: thisHasNoHareke,
      },
      Prev: {
        Char: prevChar?.Char.replace('◌', ''),
        Type: prevChar?.Type ?? -1 as CharType,
        Diacritic: prevChar?.Diacritic ?? -1 as DiacriticType,

        Hareke: prevHarakatType,
        Prev: {
          Char: prevPrevChar?.Char.replace('◌', ''),
          Type: prevPrevChar?.Type ?? -1 as CharType,
          Diacritic: prevPrevChar?.Diacritic ?? -1 as DiacriticType,
        }
      },
      Next: {
        Char: nextChar?.Char.replace('◌', ''),
        Type: nextChar?.Type ?? -1 as CharType,
        Diacritic: nextChar?.Diacritic ?? -1 as DiacriticType,

        Hareke: nextHarakatType,
        Harekesiz: nextHasNoHareke,
        Next: {
          Char: nextNextChar?.Char.replace('◌', ''),
          Type: nextNextChar?.Type ?? -1 as CharType,
          Diacritic: nextNextChar?.Diacritic ?? -1 as DiacriticType,
        }
      }
    } as INavigation;

    // console.log('Nav', Nav);
    return Nav;
  }

  Transliterate(character: ICharacter, Nav: INavigation, prevWordLetters: ILetter[])
    : { Ar: string; Latin: string; Rule?: IRule; } {
    let ruleResponse: RuleResponse = {Success: false} as RuleResponse;
    // console.log('Transliterate', character, navigation, prevWordLetters);

    const Updater = (rule: RuleResponse) => rule.Success ? rule : ruleResponse;

    // Letter
    if (character.Type === CharType.Letter) {
      // console.log(`${CharType[letter.Type]} | ['${letter.Name}'] |`);
      ruleResponse = Updater(Rules.Letter.Regular(Nav, character));

      // Letter ['elif']
      if (character.Char === 'ا') {
        // {UCS: '0627', Char: 'ا', Category: 'Lo (Other Letter)', Name: 'ARABIC LETTER ALEF'} as IUnicode,
        ruleResponse = Updater(Rules.Med.Letter.FathaElif(Nav));
      }
      // Letter ['wāw']
      else if (character.Char === 'و') {
        // {UCS: '0648', Char: 'و', Category: 'Lo (Other Letter)', Name: 'ARABIC LETTER WAW'} as IUnicode,
        ruleResponse = Updater(Rules.Med.Letter.DammaWaw(Nav));

        // TODO | [AlifKhanjariyah]+['wāw']
        ruleResponse = Updater(Rules.Letter.AlifKhanjariyahWaw(Nav)); // ..+|AlifKhanjariyah|+|'wāw'|+|L|+..
        // TODO | ['wāw']+[Hamza]
        ruleResponse = Updater(Rules.Letter.WawHamza(Nav)); // ..+|'wāw'|+|'◌ٔ'|+..
      }

      // Letter ['yā']
      else if (character.Char === 'ي') {
        // {UCS: '064A', Char: 'ي', Category: 'Lo (Other Letter)',        Name: 'ARABIC LETTER YEH'} as IUnicode,

        ruleResponse = Updater(Rules.Med.Letter.KasraYe(Nav));

        // TODO | [AlifKhanjariyah]+['yā']
        ruleResponse = Updater(Rules.Letter.AlifKhanjariyahYe(Nav)); // ..+|AlifKhanjariyah|+|'yā'|+|L|+..
        // TODO | ['yā']+[AlifKhanjariyah]
        ruleResponse = Updater(Rules.Letter.YeAlifKhanjariyah(Nav)); // ..+|'yā'|+|AlifKhanjariyah|+..
        // TODO | ['yā']+[Hamza]
        ruleResponse = Updater(Rules.Letter.YeHamza(Nav)); //  ..+|'yā'|+|'◌ٔ'|+..
      }

      // Letter ['yā'] - Alif Maqsūra
      else if (character.Char === 'ى') {
        // {UCS: '0649', Char: 'ى', Category: 'Lo (Other Letter)',        Name: 'ARABIC LETTER ALEF MAKSURA'} as IUnicode,
        ruleResponse = Updater(Rules.AlifMaqsura.Letter.FathaYeEND(Nav)); // ..+|Fatha|+|'yā'||END|
      }

      // Letter ['lām']
      else if (character.Char === 'ل') {
        // {UCS: '0644', Char: 'ل', Category: 'Lo (Other Letter)',        Name: 'ARABIC LETTER LAM'} as IUnicode,
        ruleResponse = Updater(Rules.Letter.LamLetterShaddah(Nav)); // ..+|'lām'|+|Letter|+|Shaddah|+..
      }

      // Letter ['tā'] - Tāʾ Marbūṭah
      else if (character.Char === 'ة') {
        // {UCS: '0629', Char: 'ة', Category: 'Lo (Other Letter)',        Name: 'ARABIC LETTER TEH MARBUTA'} as IUnicode,
        ruleResponse = Updater(Rules.Letter.TaMarbutah(Nav, character));
      }

      // ELSEs
      else {
        // latin = regular;
      }
    }
    // Arabic Diacritics (Aksan işaretleri)
    else if (character.Type === CharType.Diacritic) {
      // Sukun
      if (character.Diacritic === DiacriticType.Sukun) {
        ruleResponse = Updater(Rules.Diacritic.Cezm(Nav));
      }
      // Shaddah
      else if (character.Diacritic === DiacriticType.Shaddah) {
        ruleResponse = Updater(Rules.Diacritic.Shaddah(Nav));
      }
      // Hareke & Tenvin
      else if (character.Diacritic === DiacriticType.Harakat || character.Diacritic === DiacriticType.Tanwin) {

        let prevChar = Nav.Prev.Char ?? '';
        if (Nav.Prev.Diacritic === DiacriticType.Shaddah) {
          prevChar = Nav.Prev.Prev.Char ?? '';
        }

        // Fatha-tan (Üstün)
        if ([HarakatType.Fatha, HarakatType.Fathatan].indexOf(Nav.Current.Hareke) > -1) {
          ruleResponse = Updater(Rules.Diacritic.Hareke.Fatha_tan.Regular(Nav, prevChar, prevWordLetters));  // ..+|Fatha-tan|+..

          // Med (Uzatma) | B4 ['elif'] (0627)
          ruleResponse = Updater(Rules.Med.Hareke.FathaElif(Nav)); // ..+|Fatha-tan|+|'elif'|+|L|+..

          // Alif Maqsura | B4 ['yā'] (0649)  ..+|Fatha-tan|+|'yā'||END|  ..+|Fatha-tan|+|'yā'|+[AlifKhanjariyah]|END|
          ruleResponse = Updater(Rules.AlifMaqsura.Diacritic.FathaYeEND(Nav));

          // B4 ['yā'] (064A)
          ruleResponse = Updater(Rules.Diacritic.Hareke.Fatha_tan.Ye(Nav));  // ..+|Fatha-tan|+|'yā'|+..

          // B4 ['wāw']
          ruleResponse = Updater(Rules.Diacritic.Hareke.Fatha_tan.Waw(Nav)); // ..+|Fatha-tan|+|'wāw'|+..

          // B4 +[Tatweel]+[AlifKhanjariyah]
          ruleResponse = Updater(Rules.Diacritic.Hareke.Fatha_tan.TatweelAlifKhanjariyah(Nav));  // ..+|Fatha-tan|+|'Tatweel|+|'AlifKhanjariyah|+..

          // Ve Bağlacı ['wāw']+[Fatha]
          let specialWawFatha = Rules.Special.WawFatha(Nav); // ..+|Start||wāw|+|Fatha|+|L(!elif)|+..
          if (specialWawFatha.Success) {
            ruleResponse = {
              ...specialWawFatha,
              Transliteration: `${ruleResponse.Transliteration}${specialWawFatha?.Transliteration}`
            };
          }
        }
        // Kesra-tan (Esre)
        else if ([HarakatType.Kasra, HarakatType.Kasratan].indexOf(Nav.Current.Hareke) > -1) {
          ruleResponse = Updater(Rules.Diacritic.Hareke.Kasra_tan(Nav, prevChar));  // ..+|Kasra-tan|+..

          // Med (Uzatma)
          ruleResponse = Updater(Rules.Med.Hareke.KasraYe(Nav));  // ..+|Kasra|+|'yā'|+|L|+..
        }
        // Damma-tan (Ötre)
        else if ([HarakatType.Damma, HarakatType.Dammatan].indexOf(Nav.Current.Hareke) > -1) {
          ruleResponse = Updater(Rules.Diacritic.Hareke.Damma_tan(Nav, prevChar)); // ..+|Damma-tan|+..

          // Med (Uzatma)
          ruleResponse = Updater(Rules.Med.Hareke.DammaWaw(Nav));  // ..+|Damma|+|'wāw'|+|L|+..
        }
        // Alif Khanjariyah | SUPERSCRIPT ALEF (Dik yazılan Üstün/Elif)
        else if (HarakatType.AlifKhanjariyah === Nav.Current.Hareke) {
          ruleResponse = Updater(Rules.Diacritic.Hareke.AlifKhanjariyah(Nav)); // ..+|AlifKhanjariyah|+..
        }
        // ELSEs
        else {
          console.log('Harakat/Tanwin | ELSEs | TODO: unset HarakatType');
          ruleResponse.Transliteration = '[Harakat]';
        }

        // | '◌ً','◌ٌ', | Nunation | Tanwin (final postnasalized or long vowels)
        if (character.Diacritic === DiacriticType.Tanwin) {
          let tanwinRegular = Rules.Diacritic.Hareke.Tanwin(Nav); // ..+|Tanwin|+..
          ruleResponse = {
            ...tanwinRegular,
            Transliteration: `${ruleResponse.Transliteration}${tanwinRegular?.Transliteration}`
          };
          // latin += ruleResponse.Transliteration ?? 'n';
        }
      }
      // Alif Maddah | Medli elif - Elif-i medde | ('آ')  https://tr.wiktionary.org/wiki/%D8%A2
      else if (character.Diacritic === DiacriticType.Maddah) {
        ruleResponse = Updater(Rules.Diacritic.Maddah(Nav));  // ..+|Maddah|+..
        // latin = ruleResponse.Transliteration ?? 'ʔaː';
      }
      // Alif Wasla https://en.wikipedia.org/wiki/Wasla https://en.wiktionary.org/wiki/%D9%B1
      else if (character.Diacritic === DiacriticType.Wasla) {
        ruleResponse = Updater(Rules.Diacritic.Wasla(Nav)); // ..+|Wasla|+..
        // latin = ruleResponse.Transliteration ?? '-';
      }
      // Hemze
      else if (character.Diacritic && [DiacriticType.Hamza, DiacriticType.HamzaLetter].indexOf(character.Diacritic) > -1) {

        if (character.Diacritic === DiacriticType.HamzaLetter) {
          ruleResponse = Updater(Rules.Diacritic.HamzaLetter(Nav));
          // latin = ruleResponse.Transliteration ?? character.Transliteration;// '[HamzaLetter]'
        }
        // above/belove
        else if (character.Diacritic === DiacriticType.Hamza) {
          console.log('TODO');
          ruleResponse.Transliteration = '[Hamza]';
        }
      }
      // Tone Markers
      else if (character.Diacritic === DiacriticType.Harbay || character.Diacritic === DiacriticType.Tela || character.Diacritic === DiacriticType.Tana) {
        this.Warning.next([`Diacritic | Tone Markers |`, `\t\t${character.Char}\t\t`, character]);

        ruleResponse.Transliteration = '[ToneMarkers]';
      }
      // ELSE?
      else {
        this.Warning.next([`SetDiacritics | ELSEs`, `\t\t${character.Char}\t\t`, character]);
        console.log('Diacritic | WTF | ELSEs');
      }
    }
    // Secavend => Quranic punctuation | Kur'an'daki duraklama işaretleri
    else if (character.Type === CharType.Secavend) {
      // this.Warning.next([`Secavend`, `\t\t\t${character.Char}\t\t\t`, letter]);

      ruleResponse = Updater(Rules.Secavend.All(Nav));

      if (!ruleResponse.Success) {
        this.Warning.next([`Secâvend`, `\t\t\t${character.Char}\t\t\t`, character]);
      }

    }
    // [Tatweel or Tatwīl | Kashida or Kasheeda]
    else if (character.Type === CharType.Tatweel) {
      ruleResponse = Updater(Rules.Tatweel.Regular(Nav));
      // console.log(ruleResponse,character);
    }
    // ELSE?
    else {
      this.Warning.next([`[Different Char.Type] | ELSEs`, `\t\t${character.Char}\t\t`, character]);
      console.log([`[Different Char.Type] | ELSEs`, `\t\t${character.Char}\t\t`, character]);

      ruleResponse.Transliteration = `[${character.Name}]`;
    }

    let arabic = character.Char;
    if (ruleResponse.Transliteration === '') {
      arabic = '';
    }
    if (character.Diacritic === DiacriticType.Shaddah) {
      arabic = `${Nav.Prev.Char}`;
    }

    // console.log(`char: ${character.Transliteration}`, ruleResponse.Transliteration);


    if (!ruleResponse.Success) {
      console.log(ruleResponse, Nav);
    }
    return {Ar: arabic, Latin: ruleResponse?.Transliteration ?? '?', Rule: ruleResponse.Rule};
  }

}
