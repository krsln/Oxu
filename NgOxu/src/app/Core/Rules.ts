import {CharType, DiacriticType, HarakatType, ICharacter, ILetter, INavigation, IRule} from "./Models";
import {Subject} from "rxjs";
import {Arabic} from "./Database/Arabic";


export class Logger {
  static Rule = new Subject<IRule | undefined>();
}

export namespace Rules {
  // https://shapecatcher.com/
  // ╢	Unicode hexadecimal: 0x2562   END
  // ╟	Unicode hexadecimal: 0x255f   START
  export class Med {
    // ***** Med (Uzatma) | https://kuran.diyanet.gov.tr/elifba/#/tecvid/meddi-tabii-muttasil-munfasil

    static Letter = class {
      // ************************* Öncesi Fethalı Harekesiz Elif | Lengthened Alif (Alif Maddiyya)
      static FathaElif(Nav: INavigation): RuleResponse {
        if (Nav.Current.Char === 'ا' && Nav.Current.Harekesiz) {
          if (HarakatType.Fatha === Nav.Prev.Hareke) {
            const rule: IRule = {
              Type: 'Letter', Name: 'Med (Uzatma)', Value: '',
              Rule: `[Fatha]+['elif']`, Pattern: `|Fatha|+|'elif'|+|L|`,
              Desc: `Elif (ا) | Kendi harekesiz, kendinden önceki harfin harekesi üstündür( َ) ince harfleri “e–a” arası bir sesle, kalın harfleri ise “a” sesiyle uzatır.`
            };

            // console.log(rule);
            Logger.Rule.next(rule);
            return {Success: true, Rule: rule, Transliteration: rule.Value};
          } else if (HarakatType.Fathatan === Nav.Prev.Hareke) {
            const rule: IRule = {
              Type: 'Letter', Name: 'Med (Uzatma)', Value: '',
              Rule: `[Fathatan]+['elif']`, Pattern: `|Fathatan|+|'elif'|+|L|`, Desc: ``
            };

            // console.log(rule);
            Logger.Rule.next(rule);
            return {Success: true, Rule: rule, Transliteration: rule.Value};
          }
        }
        return {Success: false};
      }

      // ************************* Öncesi Kesralı Harekesiz Yâ
      static KasraYe(Nav: INavigation): RuleResponse {
        if (Nav.Current.Char === 'ي' && Nav.Current.Harekesiz) {
          if (Nav.Prev.Hareke === HarakatType.Kasra) {
            const rule: IRule = {
              Type: 'Letter', Name: 'Med (Uzatma)', Value: '',
              Rule: `[Kasra]+['yā']`, Pattern: `|Kasra|+|'yā'|+|L|`,
              Desc: `Ye  (ي) | Kendi harekesiz, kendinden önceki harfin harekesi esredir ( ِ) ve bir elif miktarı “i” sesini uzatır.`
            };

            // console.log(rule);
            Logger.Rule.next(rule);
            return {Success: true, Rule: rule, Transliteration: rule.Value};
          }
        }
        return {Success: false};
      }

      // ************************* Öncesi Dammeli Harekesiz Wāw
      static DammaWaw(Nav: INavigation): RuleResponse {
        if (Nav.Current.Char === 'و' && Nav.Current.Harekesiz) {
          if (Nav.Prev.Hareke === HarakatType.Damma) {
            const rule: IRule = {
              Type: 'Letter', Name: 'Med (Uzatma)', Value: '',
              Rule: `[Damma]+['wāw']`, Pattern: `|Damma|+|'wāw'|+|L|`,
              Desc: `Vâv (و) | Kendi harekesiz, kendinden önceki harfin harekesi ötredir ( ُ) ve bir elif miktarı “u” sesini uzatır.`
            };

            // console.log(rule);
            Logger.Rule.next(rule);
            return {Success: true, Rule: rule, Transliteration: rule.Value};
          }
        }
        return {Success: false};
      }

    };
    static Hareke = class {
      static FathaElif(Nav: INavigation): RuleResponse {
        if ([HarakatType.Fatha, HarakatType.Fathatan].indexOf(Nav.Current.Hareke) > -1) {
          if (Nav.Next.Char === 'ا' && Nav.Next.Harekesiz) {
            const rule: IRule = {
              Type: 'Diacritic', Name: 'Med (Uzatma)', Value: 'ā',
              Rule: `[Fatha-tan]+[''alif']`, Pattern: `|Fatha-tan|+|'elif'|+|L|`,
              Desc: `it represents a long /aː/ (close to the sound of "a" in the English word "dad"). For example: ⟨دَا⟩ /daː/.`
            };

            // console.log(rule);
            Logger.Rule.next(rule);
            return {Success: true, Rule: rule, Transliteration: rule.Value};
          }
        }
        return {Success: false};
      }

      static KasraYe(Nav: INavigation): RuleResponse {
        if (HarakatType.Kasra === Nav.Current.Hareke) {
          if (Nav.Next.Char === 'ي' && Nav.Next.Harekesiz) {
            const rule: IRule = {
              Type: 'Diacritic', Name: 'Med (Uzatma)', Value: 'ī',
              Rule: `[Kasra]+['yā']`, Pattern: `|Kasra|+|'yā'|+|L|`,
              Desc: `it represents a long /iː/ (as in the English word "steed"). For example: ⟨دِي⟩ /diː/.`
            };

            // console.log(rule);
            Logger.Rule.next(rule);
            return {Success: true, Rule: rule, Transliteration: rule.Value};
          }
        }
        return {Success: false};
      }

      static DammaWaw(Nav: INavigation): RuleResponse {
        if (HarakatType.Damma === Nav.Current.Hareke) {
          if (Nav.Next.Char === 'و' && Nav.Next.Harekesiz) {
            const rule: IRule = {
              Type: 'Diacritic', Name: 'Med (Uzatma)', Value: 'ū',
              Rule: `[Damma]+['wāw']`, Pattern: `|Damma|+|'wāw'|+|L|`,
              Desc: `it represents a long /uː/ (like the 'oo' sound in the English word "swoop"). For example: ⟨دُو⟩ /duː/.`
            };

            // console.log(rule);
            Logger.Rule.next(rule);
            return {Success: true, Rule: rule, Transliteration: rule.Value};
          }
        }
        return {Success: false};
      }

    };

  }

  // ***** Alif Maqsūra | Elif-i Maksure | https://de.wikipedia.org/wiki/Alif_maqs%C5%ABra
  export class AlifMaqsura {
    // 0649 ARABIC LETTER ALEF MAKSURA
    // FEEF ARABIC LETTER ALEF MAKSURA ISOLATED FORM
    // FEF0	ARABIC LETTER ALEF MAKSURA FINAL FORM
    static Letter = class {
      static FathaYeEND(Nav: INavigation): RuleResponse {
        if (Nav.Current.Char === 'ى') {
          // |Fatha|+|'ye'|╢
          if (Nav.Current.Harekesiz && Nav.Navigation.Index == Nav.Navigation.Length - 1) {
            if (HarakatType.Fatha === Nav.Prev.Hareke) {
              const rule: IRule = {
                Type: 'Letter', Name: 'Alif Maqsura', Value: 'ā',
                Rule: `[Fatha]+['yā']|`, Pattern: `|Fatha|+|'yā'|╢`,  // [✓] TESTED | Surah-104
                Desc: `Bu “ye” harfinin kelime sonunda olması ve fetha ile harekeli harften sonra sakin olarak gelmesi gerekir. Bu şekilde ye yazıldığı halde “a” sesi veren ye’lere elif-i maksûre denir. Elif-i maksure elif-i memdudenin yarısı uzunluğunda okutur.`
              };

              // console.log(rule);
              Logger.Rule.next(rule);
              return {Success: true, Rule: rule, Transliteration: rule.Value};
            } else if (HarakatType.Fathatan === Nav.Prev.Hareke) {
              const rule: IRule = {
                Type: 'Letter', Name: 'Alif Maqsura', Value: 'ā',
                Rule: `[Fathatan]+['yā']|`, Pattern: `|Fathatan|+|'yā'|╢`, // [✓] TESTED | Surah-79
                Desc: ``
              };

              // console.log(rule);
              Logger.Rule.next(rule);
              return {Success: true, Rule: rule, Transliteration: rule.Value};
            }
          }
          // |Fatha|+|'yā'|+|AlifKhanjariyah|╢
          else if (Nav.Navigation.Index == Nav.Navigation.Length - 2 && Nav.Next.Hareke === HarakatType.AlifKhanjariyah) {
            // Fatha + ...
            if (Nav.Prev.Hareke === HarakatType.Fatha) {
              const rule: IRule = {
                Type: 'Letter', Name: 'Alif Maqsura', Value: '', // AlifKhanjariyah will set the value
                Rule: `[Fatha]+['yā']+[AlifKhanjariyah]|`, Pattern: `|Fatha|+|'yā'|+|AlifKhanjariyah|╢`, // [✓] TESTED | Surah-111
                Desc: ``
              };

              // console.log(rule);
              Logger.Rule.next(rule);
              return {Success: true, Rule: rule, Transliteration: rule.Value};
            }
          }
        }

        return {Success: false};
      }
    };
    static Diacritic = class {
      static FathaYeEND(Nav: INavigation): RuleResponse {
        if ([HarakatType.Fatha, HarakatType.Fathatan].indexOf(Nav.Current.Hareke) > -1) {
          // B4 ['yā'] (0649) Alif Maqsura
          if (Nav.Next.Char === 'ى') {
            if (!Nav.Next.Next.Char) {
              const rule: IRule = {
                Type: 'Diacritic', Name: 'Alif Maqsura', Value: '',
                Rule: `[Fatha-tan]+['yā']|`, Pattern: `|Fatha-tan|+|'yā'|╢`, // [✓] TESTED | Surah-104
                Desc: ``
              };

              // console.log(rule);
              Logger.Rule.next(rule);
              return {Success: true, Rule: rule, Transliteration: rule.Value};
            } else if (Arabic.GetHarakatType(Nav.Next.Next.Char) === HarakatType.AlifKhanjariyah) {
              const rule: IRule = {
                Type: 'Diacritic', Name: 'Alif Maqsura', Value: '',  // [✓] TESTED | Surah-111
                Rule: `[Fatha-tan]+['yā']+[AlifKhanjariyah]|`, Pattern: `|Fatha-tan|+|'yā'|+[AlifKhanjariyah]╢`,
                Desc: ``
              };
              // Note: not checking if these are the end of the word... but probably it is

              // console.log(rule);
              Logger.Rule.next(rule);
              return {Success: true, Rule: rule, Transliteration: rule.Value};
            }
          }
        }
        return {Success: false};
      }
    };
  }

  export class Letter {
    static Regular(Nav: INavigation, char: ICharacter): RuleResponse {
      if (CharType.Letter === Nav.Current.Type) {
        const rule: IRule = {
          Type: 'Letter', Name: 'Letter', Value: char.Transliteration,
          Rule: `Regular`, Pattern: `|L|`, Desc: ``
        };
        // console.log(rule.Value);
        Logger.Rule.next(rule);
        return {Success: true, Rule: rule, Transliteration: rule.Value};
      }
      return {Success: false};
    }

    // ***** Letter ['lām']
    static LamLetterShaddah(Nav: INavigation): RuleResponse {
      if (Nav.Current.Char === 'ل') {
        if (Nav.Next.Type === CharType.Letter && Nav.Next?.Next?.Diacritic === DiacriticType.Shaddah) {
          const rule: IRule = {
            Type: 'Letter', Name: '', Value: '',
            Rule: `['lām']`, Pattern: `|'lām'|+|L|+|Shaddah|`, // [✓] TESTED | Surah-1
            Desc: `Lām harfinden sonra gelen harfin üzerinde Şedde varsa, lām okunmaz`
          };

          // console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
      }
      return {Success: false};
    }

    // ***** Letter ['wāw']
    static AlifKhanjariyahWaw(Nav: INavigation): RuleResponse {
      if (Nav.Current.Char === 'و') {
        if (Nav.Current.Harekesiz && Nav.Prev.Hareke === HarakatType.AlifKhanjariyah) {
          const rule: IRule = {
            Type: 'Letter', Name: '', Value: '',
            Rule: `TODO | [AlifKhanjariyah]+['wāw']`, Pattern: `|AlifKhanjariyah|+|'wāw'|+|L|`,
            Desc: `Dik çizgi uzatmasından sonra gelen harekesiz vav (و) ile harekesiz ya (ى) okunmaz, atlanır.`
          };

          console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
      }
      return {Success: false};
    }

    static WawHamza(Nav: INavigation): RuleResponse {
      if (Nav.Current.Char === 'و') {
        if (Nav.Next.Diacritic === DiacriticType.Hamza && Nav.Next.Char === 'ٔ') {
          // {UCS: '0654', Char: '◌ٔ', Type: diacritic, Diacritic: hamza, Transliteration: '', Name: 'ARABIC HAMZA ABOVE'},
          const rule: IRule = {
            Type: 'Letter', Name: '', Value: '',
            Rule: `TODO | ['wāw']+[Hamza]`, Pattern: `|'wāw'|+|'◌ٔ'|`,
            Desc: `Kısa hemzenin altındaki [wāw] ile ye okunmazlar`
          };

          console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
      }
      return {Success: false};
    }

    // ***** Letter ['yā']
    static AlifKhanjariyahYe(Nav: INavigation): RuleResponse {
      if (Nav.Current.Char === 'ي') {
        if (Nav.Current.Harekesiz && Nav.Prev.Hareke === HarakatType.AlifKhanjariyah) {
          const rule: IRule = {
            Type: 'Letter', Name: '', Value: '',
            Rule: `TODO | [AlifKhanjariyah]+['yā']`, Pattern: `|AlifKhanjariyah|+|'yā'|+|L|`,
            Desc: `Dik çizgi uzatmasından sonra gelen harekesiz vav (و) ile harekesiz ya (ى) okunmaz, atlanır.`
          };

          console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
      }
      return {Success: false};
    }

    static YeAlifKhanjariyah(Nav: INavigation): RuleResponse {
      if (Nav.Current.Char === 'ي') {
        if (Nav.Next.Hareke === HarakatType.AlifKhanjariyah) {
          const rule: IRule = {
            Type: 'Letter', Name: '', Value: '',
            Rule: `TODO | ['yā']+[AlifKhanjariyah]`, Pattern: `|'yā'|+|AlifKhanjariyah|`,
            Desc: `ye nin üstünde dik çizgi varsa`
          };

          console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
      }
      return {Success: false};
    }

    static YeHamza(Nav: INavigation): RuleResponse {
      if (Nav.Current.Char === 'ي') {
        if (Nav.Next.Diacritic === DiacriticType.Hamza && Nav.Next.Char === 'ٔ') {
          // {UCS: '0654', Char: '◌ٔ', Type: diacritic, Diacritic: hamza, Transliteration: '', Name: 'ARABIC HAMZA ABOVE'},
          const rule: IRule = {
            Type: 'Letter', Name: '', Value: '',
            Rule: `TODO | ['yā']+[Hamza]`, Pattern: `|'yā'|+|'◌ٔ'|`,
            Desc: `Kısa hemzenin altındaki vav ile [yā] okunmazlar`
          };

          console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
      }
      return {Success: false};
    }

    // ***** Letter ['tā'] - Tāʾ Marbūṭah
    static TaMarbutah(Nav: INavigation, character: ICharacter): RuleResponse {
      if (Nav.Current.Char === 'ة') {
        // {UCS: '0629', Char: 'ة', Category: 'Lo (Other Letter)', Name: 'ARABIC LETTER TEH MARBUTA'} as IUnicode,
        const rule: IRule = {
          Type: 'Letter', Name: '', Value: character.Transliteration,
          Rule: `TODO | ['tā']`, Pattern: ``,
          Desc: ``
        };
        // TODO: Letter ['tā'] - Tāʾ Marbūṭah
        // ‘Ta Marbutah’ is a letter which is basically a combination of 2 Arabic letters
        // — the soft ha ہ with 2 dots of the third Arabic letter ت and is governed by several rules which are as follows:
        // 1- ‘marbut’ is an adjective meaning ‘tied or joined’
        // 2- ‘ta marbutah’ (ة) must always occur as the last letter of a word...mostly tied or joined at the end of the word...hence the name
        // 3- ‘Ta marbutah’ is also called the ’round Ta’ and is indicative of a word being feminine mostly...
        // 4- Since in Arabic even adjectives , colours, numerals etc. have both the masculine and feminine genders—the ‘ta marbutah is also used to
        // turn a masculine word feminine i.e ‘Wazeer’ a male minister ‘wazeerah’ a lady minister
        // 5-the soft Hindi ‘त’ sound ( due to the 2 dots of ت ) comes only if the ‘ta marbutah’ has any of the Arabic case endings( dammah, fatha, kasrah)
        // otherwise such a feminine word (made by suffixing the masculine word with ta marbutah) only ends in the soft ‘h’ sound..i.e sayyaarah …a feminine word…(car) which with case ending sounds ‘sayyaaratun’

        // t or h ??? TODO
        // console.log(`Letter ['tā'] Tāʾ Marbūṭah`, 'TODO:', Nav.Navigation);
        Logger.Rule.next(rule);
        return {Success: true, Rule: rule, Transliteration: rule.Value};
      }
      return {Success: false};
    }

  }

  // ***** Diacritic | Sukun | Shaddah | Hareke & Tenvin | Maddah | Wasla | Hamza
  export class Diacritic {
    // ***** Diacritic | Sukun
    static Cezm(Nav: INavigation): RuleResponse {
      if (Nav.Current.Diacritic === DiacriticType.Sukun) {
        const rule: IRule = {
          Type: 'Diacritic', Name: 'Cezm', Value: ``, // [✓] TESTED | Surah-1
          Rule: `Regular`, Pattern: `|Cezm|`, Desc: ``
        };

        // console.log(rule);
        Logger.Rule.next(rule);
        return {Success: true, Rule: rule, Transliteration: rule.Value};
      }
      return {Success: false};
    }

    // ***** Diacritic | Shaddah
    static Shaddah(Nav: INavigation): RuleResponse {
      if (Nav.Current.Diacritic === DiacriticType.Shaddah) {
        // [Letter]+[Shaddah]
        if (Nav.Prev.Type === CharType.Letter) {
          let repeatB4 = `${Arabic.Characters().find(x => x.Char === Nav.Prev.Char)?.Transliteration}`;

          // [✓] | ~ |L|+|Shaddah|+|Harakat|
          if (Nav.Next.Diacritic === DiacriticType.Harakat) {
            const rule: IRule = {
              Type: 'Diacritic', Name: 'Shaddah', Value: 'RepeatB4', // [✓] TESTED | Surah-1
              Rule: `[Shaddah]+[Harakat]`, Pattern: `|L|+|Shaddah|+|Harakat|`, Desc: ``
            };

            // console.log(rule);
            Logger.Rule.next(rule);
            return {Success: true, Rule: rule, Transliteration: repeatB4};
          }
          // [✓] | ~ |L|+|Shaddah|+|Tanwin|
          else if (Nav.Next.Diacritic === DiacriticType.Tanwin) {
            const rule: IRule = {
              Type: 'Diacritic', Name: 'Shaddah', Value: 'RepeatB4', // [✓] TESTED | Surah-99
              Rule: `[Shaddah]+[Tanwin]`, Pattern: `|L|+|Shaddah|+|Tanwin|`, Desc: ``
            };

            // console.log(rule);
            Logger.Rule.next(rule);
            return {Success: true, Rule: rule, Transliteration: repeatB4};
          }
          // ELSEs
          else {
            console.log(['Shaddah | after Letter |  ELSEs', Nav]);
          }
        } else {
          console.log(['Diacritic | Shaddah | Before Char is NOT a LETTER!', Nav]);
        }
      }
      return {Success: false};
    }

    // ***** Alif Maddah | Medli elif - Elif-i medde | ('آ')  https://tr.wiktionary.org/wiki/%D8%A2
    static Maddah(Nav: INavigation): RuleResponse {
      if (DiacriticType.Maddah === Nav.Current.Diacritic) {
        const rule: IRule = {
          Type: 'Diacritic', Name: 'Maddah', Value: 'ʔaː', Rule: `Regular`, Pattern: `|Maddah|`, // [✓] TESTED | Surah-106
          Desc: `For example: ⟨قُرْآن⟩ /qurˈʔaːn/.`
        };

        // console.log(rule);
        Logger.Rule.next(rule);
        return {Success: true, Rule: rule, Transliteration: rule.Value};
      }
      return {Success: false};
    }

    // ***** Alif Wasla https://en.wikipedia.org/wiki/Wasla https://en.wiktionary.org/wiki/%D9%B1
    static Wasla(Nav: INavigation): RuleResponse {
      if (DiacriticType.Maddah === Nav.Current.Diacritic) {
        const rule: IRule = {
          Type: 'Diacritic', Name: 'Wasla', Value: '-', Rule: `Regular`, Pattern: `|Wasla|`,
          Desc: ``
        };

        if (Nav.Navigation.Index === 0) {
          console.log('Alif Wasla', Nav.Navigation);
          //  For example: ⟨بِٱسْمِ⟩ (bismi), but ⟨ٱمْشُوا۟⟩ (imshū not mshū). This is because no Arab word can start with a vowel-less consonant:
          //  If the second letter from the waṣlah has a kasrah, the alif-waslah makes the sound /i/.
          //  However, when the second letter from it has a dammah, it makes the sound /u/.
        }

        console.log(rule);
        Logger.Rule.next(rule);
        return {Success: true, Rule: rule, Transliteration: rule.Value};
      }
      return {Success: false};
    }

    // ***** Hamza Letter
    static HamzaLetter(Nav: INavigation): RuleResponse {
      if (Nav.Current.Diacritic && [DiacriticType.Hamza, DiacriticType.HamzaLetter].indexOf(Nav.Current.Diacritic) > -1) {
        // + Letter
        if (Nav.Next.Type === CharType.Letter) {
          const rule: IRule = {
            Type: 'Diacritic', Name: 'Hamza Letter', Value: '\'eiu',
            Rule: `Regular`, Pattern: `|HamzaLetter|+|L|`,
            Desc: `Hemze, bazı kelimelerin üzerinde yazıldığında bu harfler yerine hemze okunur.Hemze bazen de tek başına bulunur.`
          };

          console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
        // + Sukun
        else if ([DiacriticType.Sukun].indexOf(Nav.Next.Diacritic) > -1) {
          const rule: IRule = {
            Type: 'Diacritic', Name: 'Hamza Letter', Value: 'ʔ',
            Rule: `B4 Sukun`, Pattern: `|HamzaLetter|+|Sukun|`, // [✓] TESTED | Surah-105/104
            Desc: `Hemze cezimli olduğunda hafif sert olarak okunur.`,
          };

          // console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
        // + Harakat-Tanwin
        else if ([DiacriticType.Harakat, DiacriticType.Tanwin].indexOf(Nav.Next.Diacritic) > -1) {
          const rule: IRule = {
            Type: 'Diacritic', Name: 'Hamza Letter', Value: '',
            Rule: `B4 Harakat`, Pattern: `|HamzaLetter|+|Harakat-Tanwin|`, // [✓] TESTED | Surah-1
            Desc: ``,
          };

          // console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
        // ELSEs
        else {
          console.log('TODO | Diacritic_HamzaLetter_Regular');
        }

      }
      return {Success: false};
    }

    // ***** Diacritic | Hareke & Tenvin
    static Hareke = class {

      static Fatha_tan = class {
        static Regular(Nav: INavigation, prevChar: string, prevWordLetters: ILetter[]): RuleResponse {
          // [✓] | Heavy & Light letters
          // Ra harfi (ر) üstün veya ötreli olursa kalın okunur
          let regular = Arabic.IsHeavyLetters(prevChar) || prevChar === 'ر' ? 'a' : 'ə'; // e ə â

          if (prevChar === 'ل') {
            // LAFZATULLAH’IN LÂM’I https://kuran.diyanet.gov.tr/elifba/#/tecvid/lafzatullahin-lami
            // Allah kelimesindeki Lâm harfinin kalın ya da ince olarak telaffuz edilmesi bir önceki harfin harekesiyle ilintilidir.
            // Kalın Okunması: √ Bir önceki hareke fetha – damme olduğunda
            // İnce Okunması: √ Bir önceki hareke kesra olduğunda

            if (Nav.Prev.Prev.Diacritic === DiacriticType.Harakat) {
              let prevPrevCharType = Arabic.GetHarakatType(Nav.Prev.Prev.Char) ?? -1 as HarakatType;
              if ([HarakatType.Fatha, HarakatType.Damma].indexOf(prevPrevCharType) > -1) {
                regular = 'a';
              }
            } else if (prevWordLetters.length > 0) {
              let prevWordLastCharType = Arabic.GetHarakatType(prevWordLetters[prevWordLetters.length - 1].Ar) ?? -1 as HarakatType;
              if ([HarakatType.Fatha, HarakatType.Damma].indexOf(prevWordLastCharType) > -1) {
                regular = 'a';
              }
            }
            // console.log(Nav.Navigation, Nav.Prev.Prev,regular);
          }

          if ([HarakatType.Fatha, HarakatType.Fathatan].indexOf(Nav.Current.Hareke) > -1) {
            const rule: IRule = {
              Type: 'Diacritic', Name: 'Fatha-tan', Value: 'a/â',
              Rule: `Regular`, Pattern: `|Fatha-tan|`, // [✓] TESTED | Surah-1
              Desc: `Fetha, bulunduğu harfi e ila a arasındaki bir sesle seslendirir. İnce harfler e sesine, kalın harfler ise a sesine yakın bir sesle seslendirilir.`
            };
            rule.Value = regular;

            // console.log(rule);
            Logger.Rule.next(rule);
            return {Success: true, Rule: rule, Transliteration: rule.Value};
          }
          return {Success: false};
        }

        // B4 ['yā'] (064A)
        static Ye(Nav: INavigation): RuleResponse {
          if ([HarakatType.Fatha, HarakatType.Fathatan].indexOf(Nav.Current.Hareke) > -1) {
            if (Nav.Next.Char === 'ي') {
              const rule: IRule = {
                Type: 'Diacritic', Name: 'Fatha-tan', Value: 'a',
                Rule: `B4 ['yā']`, Pattern: `|Fatha-tan|+|'yā'|`, // [✓] TESTED | Surah-1
                Desc: `When a fathah is placed before the letter ⟨ﻱ⟩ (yā’), it creates an /aj/ (as in "lie");`
              };

              // console.log(rule);
              Logger.Rule.next(rule);
              return {Success: true, Rule: rule, Transliteration: rule.Value};
            }
          }
          return {Success: false};
        }

        // B4 ['wāw']
        static Waw(Nav: INavigation): RuleResponse {
          if ([HarakatType.Fatha, HarakatType.Fathatan].indexOf(Nav.Current.Hareke) > -1) {
            if (Nav.Next.Char === 'و') {
              const rule: IRule = {
                Type: 'Diacritic', Name: 'Fatha-tan', Value: 'a',
                Rule: `B4 ['wāw']`, Pattern: `|Fatha-tan|+|'wāw'|`, // [✓] TESTED | Surah-1
                Desc: `when placed before the letter ⟨و⟩ (wāw), it creates an /aw/ (as in "cow").`
              };

              // console.log(rule);
              Logger.Rule.next(rule);
              return {Success: true, Rule: rule, Transliteration: rule.Value};
            }
          }
          return {Success: false};
        }

        // B4 +[Tatweel]+[AlifKhanjariyah]
        static TatweelAlifKhanjariyah(Nav: INavigation): RuleResponse {
          if ([HarakatType.Fatha, HarakatType.Fathatan].indexOf(Nav.Current.Hareke) > -1) {
            if (Nav.Next.Type === CharType.Tatweel && Arabic.GetHarakatType(Nav.Next.Next.Char) === HarakatType.AlifKhanjariyah) {
              const rule: IRule = {
                Type: 'Diacritic', Name: 'Fatha-tan', Value: '',
                Rule: `B4 +[Tatweel]+[AlifKhanjariyah]`,  // [✓] TESTED | Surah-1
                Pattern: `|Fatha-tan|+|'Tatweel|+|'AlifKhanjariyah|`, Desc: ``
              };

              // console.log(rule);
              Logger.Rule.next(rule);
              return {Success: true, Rule: rule, Transliteration: rule.Value};
            }
          }
          return {Success: false};
        }
      };

      static Kasra_tan(Nav: INavigation, prevChar: string): RuleResponse {
        // [✓] | Heavy & Light letters
        let regular = Arabic.IsHeavyLetters(prevChar) ? 'î' : 'i';

        if ([HarakatType.Kasra, HarakatType.Kasratan].indexOf(Nav.Current.Hareke) > -1) {
          const rule: IRule = {
            Type: 'Diacritic', Name: 'Kasra-tan', Value: 'i/î',
            Rule: `Regular`, Pattern: `|Kasra-tan|`, // [✓] TESTED | Surah-1
            Desc: `Kesra, bulunduğu harfi i ile ı arasında bir sesle seslendirir. İnce harfler i sesine, kalın harfler ise ı sesine yakın bir sesle seslendirilir.`
          };
          rule.Value = regular;

          // console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
        return {Success: false};
      }

      static Damma_tan(Nav: INavigation, prevChar: string): RuleResponse {
        // [✓] | Heavy & Light letters
        // Ra harfi (ر) üstün veya ötreli olursa kalın okunur
        let regular = Arabic.IsHeavyLetters(prevChar) || prevChar === 'ر' ? 'u' : 'û';

        if ([HarakatType.Damma, HarakatType.Dammatan].indexOf(Nav.Current.Hareke) > -1) {
          const rule: IRule = {
            Type: 'Diacritic', Name: 'Damma-tan', Value: 'u/û',
            Rule: `Regular`, Pattern: `|Damma-tan|`, // [✓] TESTED | Surah-1
            Desc: `Damma, bulunduğu harfi ü ile u arasında bir sesle seslendirir. İnce harfler ü sesine, kalın harfler ise u sesine yakın bir sesle seslendirilir.`
          };
          rule.Value = regular;

          // console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
        return {Success: false};
      }

      static AlifKhanjariyah(Nav: INavigation): RuleResponse {
        if (HarakatType.AlifKhanjariyah === Nav.Current.Hareke) {
          const rule: IRule = {
            Type: 'Diacritic', Name: 'AlifKhanjariyah', Value: 'ā', // [✓] TESTED | Surah-1
            Rule: `Regular`, Pattern: `|AlifKhanjariyah|`, Desc: ``
          };

          // console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
        return {Success: false};
      }

      // ***** Tanwin
      static Tanwin(Nav: INavigation): RuleResponse {
        if (DiacriticType.Tanwin === Nav.Current.Diacritic) {
          const rule: IRule = {
            Type: 'Diacritic', Name: 'Tanwin', Value: 'n', // [✓] TESTED | Surah-113
            Rule: `Regular`, Pattern: `|Tanwin|`, Desc: ``
          };

          // console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
        return {Success: false};
      }

    };
  }

  export class Special {
    // ***** Ve Bağlacı ['wāw']+[Fatha]
    static WawFatha(Nav: INavigation): RuleResponse {
      if ([HarakatType.Fatha, HarakatType.Fathatan].indexOf(Nav.Current.Hareke) > -1) {
        if (Nav.Prev.Char === 'و' && Nav.Navigation.Index === 1 && Nav.Next.Char !== 'ا') {
          const rule: IRule = {
            Type: 'Special', Name: '', Value: ' ',
            Rule: `Ve Bağlacı`, Pattern: `╟|wāw|+|Fatha|+|L(!elif)|`, // [✓] TESTED | Surah-1
            Desc: ``
          };

          // console.log(rule);
          Logger.Rule.next(rule);
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
      }
      return {Success: false};
    }
  }

  // ***** Secâvend
  export class Secavend {
    static All(Nav: INavigation): RuleResponse {
      {
        if (CharType.Secavend === Nav.Current.Type) {
          let rule: IRule = {} as IRule;
          // Mim ('م')
          if ('◌ۘ'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|STOP|', Rule: `Mim ('م')`, Pattern: `Mim`, // 'U+06D8 (1752)' Surah-2
              Desc: `Muhakkak durmalıdır. Durmak vâcibdir, durulmayıp geçilirse anlam bozulur.`
            };

            // console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // Tı ('ط')
          else if ('[todo]'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|STOP|', Rule: `TODO |Tı ('ط')`, Pattern: `Tı`,
              Desc: `Durmak gerekir.`
            };

            console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // Cim ('ج') | 'U+06DA (1754)' Surah-2
          else if ('◌ۚ'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|stop|', Rule: `Cim ('ج')`, Pattern: `Cim`,
              Desc: `Geçmek de durmak da câizdir fakat durmak daha iyidir.`
            };

            // console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // Ze ('ز')
          else if ('[todo]'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|pass|', Rule: `TODO |Ze ('ز')`, Pattern: `Ze`,
              Desc: `Geçmek de durmak da câizdir fakat geçmek daha iyidir.`
            };

            console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // Gaf ('ق')
          else if ('[todo]'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|pass|', Rule: `TODO |Gaf ('ق')`, Pattern: `Gaf`,
              Desc: `Geçmek de durmak da câizdir fakat geçmek daha iyidir.`
            };

            console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // Lâmelif ('لا') | 'U+06D9 (1753)' Surah-2
          else if ('◌ۙ'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|PASS|', Rule: `Lâmelif ('لا')`, Pattern: `Lâmelif`,
              Desc: `Durulmaz! Bulunan yerde durulursa, önceki kelime ile birlikte tekrar okunur. Âyet-i kerime sonunda durunca, tekrar edilmez.`

            };

            // console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // Gıf ('قف') | 'U+06D7 (1751)' Surah-2
          else if ('◌ۗ'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|stop|', Rule: `Gıf ('قف')`, Pattern: `Gıf`,
              Desc: `Durmak daha iyidir. (Gaf ile Fe’nin bitişik yazılışı)`
            };

            // console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // Sad ('ص')
          else if ('[todo]'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|pass|', Rule: `TODO |Sad ('ص')`, Pattern: `Sad`,
              Desc: `Durmakta mahzur yoktur.`
            };

            console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // Sad-Lam-Ya ('صلي') | 'U+06D6 (1750)' Surah-2
          else if ('◌ۖ'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|pass|', Rule: `Sad-Lam-Ya ('صلي')`, Pattern: `Sad-Lam-Ya`,
              Desc: `Geçmek daha iyidir.`
            };

            // console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // Üç nokta ('.:__:.') | 'U+06DB (1755)' Surah-2
          else if ('◌ۛ'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|.:_:.|', Rule: `Üç Nokta ('.:_:.')`, Pattern: `Üç Nokta`,
              Desc: `Bu üç noktanın birisinde durulur. Eğer üzerinde üç nokta bulunan birinci kelimede durulursa, üç nokta olan ikinci kelimede durulmaz.`
            };

            // console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // Ayn ('ع')
          else if ('[todo]'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|STOP|', Rule: `TODO |Ayn ('ع')`, Pattern: `Ayn`,
              Desc: `Bazı âyet-i kerimelerin sonunda bulunur. Namazda okunursa bu işaret bulunan yerde rukûya gitmek iyi olur.`
            };

            console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // Kef ('ك')
          else if ('[todo]'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|copy|', Rule: `TODO |Kef ('ك')`, Pattern: `Kef`,
              Desc: `Kezalik demektir. Kendisinden önce hangi secavent geçmişse, bu da öyle demektir.`
            };

            console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // Sīn ('س') or سكتة (sktẗ) | U+06DC (1756) Surah-83
          else if ('◌ۜ'.replace('◌', '') === Nav.Current.Char) {
            rule = {
              Type: 'Secavend', Name: 'Regular', Value: '|STOP|', Rule: `Sīn ('س')`, Pattern: `Sīn`,
              Desc: `Sekte kısaltması. Nefes vermeden durmak gerekir. Sessizlik efekti verir.`
            };

            // console.log(rule, Nav.Current.Char);
            Logger.Rule.next(rule);
          }
          // ELSEs
          else {
            console.log([`Secâvend`, `\t\t\t${Nav.Current.Char}\t\t\t`, Nav]);
          }
          return {Success: true, Rule: rule, Transliteration: rule.Value};
        }
        return {Success: false};
      }
    }

  }

  // ***** Tatweel
  export class Tatweel {
    static Regular(Nav: INavigation): RuleResponse {
      if (CharType.Tatweel === Nav.Current.Type) {
        const rule: IRule = {
          Type: 'Tatweel', Name: 'Tatweel', Value: '',
          Rule: `Regular`, Pattern: `|Tatweel|`, Desc: ``
        };
        // Combining Overline | Unicode Character “◌̅” (U+0305)

        // console.log(rule.Value);
        Logger.Rule.next(rule);
        return {Success: true, Rule: rule, Transliteration: rule.Value};
      }
      return {Success: false};
    }

  }

}

export interface RuleResponse {
  Success: boolean;

  Transliteration?: string;
  Rule?: IRule;
}
