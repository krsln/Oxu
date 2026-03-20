// https://en.wikipedia.org/wiki/Help:IPA/Arabic
// https://en.wikipedia.org/wiki/Help:IPA/Turkish
// https://www.antvaset.com/ipa-to-speech
// https://www.internationalphoneticalphabet.org/ipa-sounds/ipa-chart-with-sounds/

// https://en.wikipedia.org/wiki/Romanization_of_Arabic
export class IPA {

  static Arabic: any[] = [

    // https://en.wikipedia.org/wiki/Romanization_of_Arabic
    {UCS: '0621', Char: 'ء', IPA: 'ʔ', Name: 'hamzah', Transliterations: ['ʼ', '\'', 'ˈ', '2']},
    {UCS: '0627', Char: 'ا', IPA: 'aː', Name: 'alif', Transliterations: ['ā', 'ʾ', 'a/e/é']},
    {UCS: '0628', Char: 'ب', IPA: 'b', Name: 'bāʼ', Transliterations: ['b']},
    {UCS: '062A', Char: 'ت', IPA: 't', Name: 'tāʼ', Transliterations: ['t']},
    {UCS: '062B', Char: 'ث', IPA: 'θ', Name: 'thāʼ', Transliterations: ['th', 'ṯ', 's/th/t']},
    {UCS: '062C', Char: 'ج', IPA: 'd͡ʒ', Name: 'jīm', Transliterations: ['j', 'ǧ', 'j/g/dj']},
    {UCS: '062D', Char: 'ح', IPA: 'ħ', Name: 'ḥāʼ', Transliterations: ['ḥ', '7/h']},
    {UCS: '062E', Char: 'خ', IPA: 'x', Name: 'khāʼ', Transliterations: ['kh', 'ẖ', 'kh/7\'/5']},
    {UCS: '062F', Char: 'د', IPA: 'd', Name: 'dāl', Transliterations: ['d']},
    {UCS: '0630', Char: 'ذ', IPA: 'ð', Name: 'dhāl', Transliterations: ['dh', 'ḏ', 'z/dh/th/d']},
    {UCS: '0631', Char: 'ر', IPA: 'r', Name: 'rāʼ', Transliterations: ['r']},
    {UCS: '0632', Char: 'ز', IPA: 'z', Name: 'zayn/zāy', Transliterations: ['z']},
    {UCS: '0633', Char: 'س', IPA: 's', Name: 'sīn', Transliterations: ['s']},
    {UCS: '0634', Char: 'ش', IPA: 'ʃ', Name: 'shīn', Transliterations: ['sh', 'š', 'sh/ch/$']},
    {UCS: '0635', Char: 'ص', IPA: 'sˤ', Name: 'ṣād', Transliterations: ['ṣ', 's/9']},
    {UCS: '0636', Char: 'ض', IPA: 'dˤ', Name: 'ḍād', Transliterations: ['ḍ', 'd/9\'/D']},
    {UCS: '0637', Char: 'ط', IPA: 'tˤ', Name: 'ṭāʼ', Transliterations: ['ṭ', 't/6/T']},
    {UCS: '0638', Char: 'ظ', IPA: 'ðˤ', Name: 'ẓāʼ', Transliterations: ['ẓ', 'z/dh/6\'/th']},
    {UCS: '0639', Char: 'ع', IPA: 'ʕ', Name: 'ʻayn', Transliterations: ['ʿ', '3']},
    {UCS: '063A', Char: 'غ', IPA: 'ɣ', Name: 'ghayn', Transliterations: ['gh', 'ġ', 'gh/3\'/8']},
    {UCS: '0641', Char: 'ف', IPA: 'f', Name: 'fāʼ', Transliterations: ['f']},
    {UCS: '0642', Char: 'ق', IPA: 'q', Name: 'qāf', Transliterations: ['q', '2/g/q/8/9']},
    {UCS: '0643', Char: 'ك', IPA: 'k', Name: 'kāf', Transliterations: ['k']},
    {UCS: '0644', Char: 'ل', IPA: 'l', Name: 'lām', Transliterations: ['l']},
    {UCS: '0645', Char: 'م', IPA: 'm', Name: 'mīm', Transliterations: ['m']},
    {UCS: '0646', Char: 'ن', IPA: 'n', Name: 'nūn', Transliterations: ['n']},
    {UCS: '0647', Char: 'ه', IPA: 'h', Name: 'hāʼ', Transliterations: ['h']},
    {UCS: '0648', Char: 'و', IPA: 'w', Name: 'wāw', Transliterations: ['w', 'ū', 'w/ou/oo/u/o']}, // IPA: 'w, uː'
    {UCS: '064A', Char: 'ي', IPA: 'j', Name: 'yāʼ', Transliterations: ['y', 'ī', 'y/i/ee/ei/ai']}, // IPA: 'j, iː'
    {UCS: '0622', Char: 'آ', IPA: 'ʔaː', Name: 'alif maddah', Transliterations: ['ʾā', '2a/aa']},
    {UCS: '0629', Char: 'ة', IPA: 't', Name: 'tāʼ marbūṭah', Transliterations: ['t', 'a/e(h); et/at']}, // IPA: 'h, t'

    {UCS: '0627 0644', Char: 'ال', IPA: '', Name: 'alif lām', Transliterations: ['al-', 'el/al']},
    {UCS: '0649', Char: 'ى', IPA: 'aː', Name: 'alif maqṣūrah', Transliterations: ['ā', 'a']},

    {UCS: '064E', Char: '◌َ', IPA: 'a', Name: 'fatḥah', Transliterations: ['a', 'a/e/é']},
    {UCS: '0650', Char: '◌ِ', IPA: 'i', Name: 'kasrah', Transliterations: ['i', 'i/e/é']},
    {UCS: '064F', Char: '◌ُ', IPA: 'u', Name: 'ḍammah', Transliterations: ['u', 'ou/o/u']},
    {UCS: '064E 0627', Char: 'ـَا', IPA: 'aː', Name: 'fatḥah alif', Transliterations: ['ā', 'a']},
    {UCS: '0650 064A', Char: 'ـِي', IPA: 'iː', Name: 'kasrah yāʼ', Transliterations: ['ī', 'i/ee']},
    {UCS: '064F 0648', Char: 'ـُو', IPA: 'uː', Name: 'ḍammah wāw', Transliterations: ['ū', 'ou/oo/u']},
    {UCS: '064E 064A', Char: 'ـَي', IPA: 'aj', Name: 'fatḥah yāʼ', Transliterations: ['ay', 'ay/ai/ey/ei']},
    {UCS: '064E 0648', Char: 'ـَو', IPA: 'aw', Name: 'fatḥah wāw', Transliterations: ['aw', 'aw/aou']},
    {UCS: '064B', Char: '◌ً', IPA: 'an', Name: 'fatḥatān', Transliterations: ['an']},
    {UCS: '064D', Char: '◌ٍ', IPA: 'in', Name: 'kasratān', Transliterations: ['in']},
    {UCS: '064C', Char: '◌ٌ', IPA: 'un', Name: 'ḍammatān', Transliterations: ['un']},
    {UCS: '', Char: '', IPA: '', Name: '', Transliterations: ['', '']},

    // @formatter:off
    // @formatter:on
  ];

}
