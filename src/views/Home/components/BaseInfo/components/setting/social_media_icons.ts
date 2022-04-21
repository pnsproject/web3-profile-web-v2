import Facebook from '../assets/icons_a/Facebook.svg'
import Facebook2 from '../assets/icons_a/Facebook-1.svg'
import Github from '../assets/icons_a/Github.svg'
import Github2 from '../assets/icons_a/Github-1.svg'
import Ins from '../assets/icons_a/ins.svg'
import Ins2 from '../assets/icons_a/ins-1.svg'
import Mail from '../assets/icons_a/Mail.svg'
import Mail2 from '../assets/icons_a/Mail-1.svg'
import Share from '../assets/icons_a/Share.svg'
import Share2 from '../assets/icons_a/Share-1.svg'

interface Icons {
  'com.facebook':any
  'com.github':any
  Ins:any
  email:any
  Share:any
}

const icons: Icons = {
  'com.facebook': [Facebook, Facebook2],
  'com.github': [Github, Github2],
  Ins: [Ins, Ins2],
  email: [Mail, Mail2],
  Share: [Share, Share2]
}

export type IconsType = keyof Icons

export default icons
