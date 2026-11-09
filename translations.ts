export type Lang = 'ru' | 'hy' | 'en'

const ru = {
  'nav.home': 'Главная',
  'nav.bio': 'Биография',
  'nav.life': 'Личная жизнь',
  'nav.paintings': 'Картины',
  'nav.style': 'Стиль и цвет',
  'nav.legacy': 'Наследие',
  'nav.museum': '3D-музей',
  'home.quote': '«Цвет — это сама жизнь».',
  'home.subtitle': 'Армянский художник, мастер цвета и создатель неповторимого художественного мира.',
  'home.dates': '1880 — 1972 · Нор-Нахичевань — Ереван',
  'home.enter': 'ВОЙТИ В МУЗЕЙ',
  'soon.text': 'Этот зал откроется на следующем этапе разработки.',
  'ui.top': 'Наверх',
  'ui.menu': 'Меню',
} as const

export type Key = keyof typeof ru
type Dict = Record<Key, string>

const hy: Dict = {
  'nav.home': 'Գլխավոր',
  'nav.bio': 'Կենսագրություն',
  'nav.life': 'Անձնական կյանք',
  'nav.paintings': 'Նկարներ',
  'nav.style': 'Ոճ և գույն',
  'nav.legacy': 'Ժառանգություն',
  'nav.museum': '3D թանգարան',
  'home.quote': '«Գույնը հենց կյանքն է»։',
  'home.subtitle': 'Հայ նկարիչ, գույնի վարպետ և եզակի գեղարվեստական աշխարհի ստեղծող։',
  'home.dates': '1880 — 1972 · Նոր Նախիջևան — Երևան',
  'home.enter': 'ՄՏՆԵԼ ԹԱՆԳԱՐԱՆ',
  'soon.text': 'Այս սրահը կբացվի մշակման հաջորդ փուլում։',
  'ui.top': 'Վերև',
  'ui.menu': 'Մենյու',
}

const en: Dict = {
  'nav.home': 'Home',
  'nav.bio': 'Biography',
  'nav.life': 'Personal life',
  'nav.paintings': 'Paintings',
  'nav.style': 'Style & color',
  'nav.legacy': 'Legacy',
  'nav.museum': '3D museum',
  'home.quote': '“Color is life itself.”',
  'home.subtitle': 'Armenian painter, master of color and creator of a world of his own.',
  'home.dates': '1880 — 1972 · Nor Nakhichevan — Yerevan',
  'home.enter': 'ENTER THE MUSEUM',
  'soon.text': 'This hall opens in the next stage of development.',
  'ui.top': 'Back to top',
  'ui.menu': 'Menu',
}

export const translations: Record<Lang, Dict> = { ru, hy, en }
