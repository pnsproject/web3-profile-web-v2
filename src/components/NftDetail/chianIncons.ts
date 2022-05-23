import eth from './assets/eth.svg'
import moonbeam from './assets/moonbeam.png'

interface ChainIcons {
  [index: string]: any
}
const chainIcons: ChainIcons = {
  1: eth,
  1284: moonbeam
}

export default chainIcons
