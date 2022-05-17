import facebook from '../assets/icons_b/facebook.svg'
import facebook1 from '../assets/icons_b/facebook1.svg'
import twitter from '../assets/icons_b/twitter.svg'
import twitter1 from '../assets/icons_b/twitter1.svg'
import copy from '../assets/icons_b/copy.svg'
import copy1 from '../assets/icons_b/copy1.svg'
import telegram from '../assets/icons_b/telegram.svg'
import telegram1 from '../assets/icons_b/telegram1.svg'
import mail from '../assets/icons_b/mail.svg'
import mail1 from '../assets/icons_b/mail1.svg'

// interface Icons {
//   facebook:any
//   twitter:any
//   mail:any
//   telegram:any
//   copy:any
// }

interface Icons {
  [key: string]: any
}

const icons: Icons = {
  facebook: [facebook, facebook1, 'Facebook'],
  twitter: [twitter, twitter1, 'Twitter'],
  mail: [mail, mail1, 'E-mail'],
  telegram: [telegram, telegram1, 'Telegram'],
  copy: [copy, copy1, 'Copy']
}

// export type IconsType = keyof Icons
export type IconsType = string

export default icons
