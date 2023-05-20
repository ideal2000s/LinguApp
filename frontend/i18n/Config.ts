//locales supported by the backend: config/application.rb -> config.i18n.available_locales
// [ locale, flag ]
export const supportedLocales = new Map<string, string>([
  ['af', 'za'],
  ['am', 'et'],
  ['ar', 'aa'],
  ['az', 'az'],
  ['be', 'by'],
  ['bg', 'bg'],
  ['bn', 'bd'],
  ['bs', 'ba'],
  ['ca', 'ad'],
  ['ceb', 'ph'],
  ['co', 'co'],
  ['cs', 'cz'],
  ['cy', 'cy'],
  ['da', 'dk'],
  ['de', 'de'],
  ['el', 'gr'],
  ['en', 'gb'],
  ['eo', 'eo'],
  ['es', 'es'],
  ['et', 'ee'],
  ['eu', 'eu'],
  ['fa', 'ir'],
  ['fi', 'fi'],
  ['fr', 'fr'],
  ['ga', 'ie'],
  ['gd', 'gd'],
  ['gl', 'gl'],
  ['gu', 'in'],
  ['ha', 'ha'],
  ['haw', 'haw'],
  ['he', 'il'],
  ['hi', 'in'],
  ['hr', 'hr'],
  ['ht', 'ht'],
  ['hu', 'hu'],
  ['hy', 'am'],
  ['id', 'id'],
  ['ig', 'ng'],
  ['is', 'is'],
  ['it', 'it'],
  ['ja', 'jp'],
  ['ka', 'ge'],
  ['kk', 'kz'],
  ['km', 'kh'],
  ['ko', 'kr'],
  ['ku', 'iq'],
  ['ky', 'kg'],
  ['la', 'va'],
  ['lb', 'lu'],
  ['lo', 'la'],
  ['lt', 'lt'],
  ['lv', 'lv'],
  ['mg', 'mg'],
  ['mi', 'nz'],
  ['mk', 'mk'],
  ['mn', 'mn'],
  ['ms', 'my'],
  ['mt', 'mt'],
  ['my', 'my'],
  ['nb', 'nb'],
  ['no', 'nb'],
  ['nn', 'nb'],
  ['ne', 'np'],
  ['nl', 'nl'],
  ['ny', 'mw'],
  ['pa', 'in'],
  ['pl', 'pl'],
  ['ps', 'af'],
  ['pt', 'pt'],
  ['ro', 'ro'],
  ['ru', 'ru'],
  ['rw', 'rw'],
  ['si', 'lk'],
  ['sk', 'sk'],
  ['sl', 'si'],
  ['sm', 'sm'],
  ['sn', 'zw'],
  ['so', 'so'],
  ['sq', 'al'],
  ['sr', 'rs'],
  ['st', 'ls'],
  ['sv', 'se'],
  ['sw', 'sw'],
  ['ta', 'lk'],
  ['te', 'in'],
  ['tg', 'tj'],
  ['th', 'th'],
  ['tk', 'tm'],
  ['tl', 'ph'],
  ['tr', 'tr'],
  ['uk', 'ua'],
  ['ur', 'pk'],
  ['uz', 'uz'],
  ['vi', 'vn'],
  ['xh', 'za'],
  ['zu', 'za']
]);

export const DEFAULT_LOCALE = supportedLocales.get(navigator.language) || 'en';