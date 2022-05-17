import BTC from './assets/btc.svg'
import ETH from './assets/eth.svg'
import KSM from './assets/kusama.svg'
import DOT from './assets/polkadot.svg'

export type IconType = 'BTC' | 'ETH' | 'KSM' | 'DOT'

export type Icons = {
  [key: string] : any
}

const icons: Icons = {
  BTC: [BTC, '#FFEDDF', '#DC8027'],
  ETH: [ETH, '#F5EEFF', '#7867D4'],
  KSM: [KSM, '#F2F2F2', '#474747'],
  DOT: [DOT, '#FFECEF', '#E71763']
}

export default icons
