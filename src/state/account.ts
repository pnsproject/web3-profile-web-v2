import { reactive } from 'vue'
import Web3 from 'web3'
import useMassage from '@/plugins/useMessage'
import appConfig, { PnsChainId } from '@/state/config'

export interface Account {
  address: string,
  currDomain: string
  domainOwner: string
  editable: boolean
}

export const account: Account = reactive({
  address: '',
  currDomain: '',
  domainOwner: '',
  editable: false
})

export const setDomainInfo = (currDomain: string, domainOwner: string) => {
  account.domainOwner = domainOwner
  account.currDomain = currDomain
}

declare const window: { ethereum: any; web3: any}

export const connect = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    try {
      await window.ethereum.enable()
      const accounts = await window.web3.eth.getAccounts()
      account.address = accounts[0]
      await switchChain()
      setEditable()
    } catch (error) {
      useMassage('error', 'User denied account access')
      console.error('User denied account access')
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    const accounts = await window.web3.eth.getAccounts()
    account.address = accounts[0]
    await switchChain()
    setEditable()
  } else {
    useMassage('error', 'Non-Ethereum browser detected. You should consider trying MetaMask!')
    console.error('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}

export const switchChain = async () => {
  const params = appConfig.chains[appConfig.pnsChainId as PnsChainId]
  const res = await window.ethereum
    .request({
      method: 'wallet_addEthereumChain',
      params: [params, account.address]
    })
  console.log(res)
}

export const setEditable = () => {
  account.editable = account.address === account.domainOwner
}
