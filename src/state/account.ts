import { reactive } from 'vue'
import Web3 from 'web3'
import useMassage from '@/plugins/useMessage'
import appConfig, { PnsChainId } from '@/state/config'

export interface Account {
  address: string
}

console.log('Web3', Web3)

export const account: Account = reactive({
  address: ''
})

declare const window: { ethereum: any; web3: any}

export const connect = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    try {
      await window.ethereum.enable()
      const accounts = await window.web3.eth.getAccounts()
      account.address = accounts[0]
      await switchChain()
    } catch (error) {
      useMassage('error', 'User denied account access')
      console.error('User denied account access')
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    const accounts = await window.web3.eth.getAccounts()
    account.address = accounts[0]
    await switchChain()
  } else {
    useMassage('error', 'Non-Ethereum browser detected. You should consider trying MetaMask!')
    console.error('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}

export const switchChain = async () => {
  const params = appConfig.chains[appConfig.pnsChainId as PnsChainId]
  window.ethereum
    .request({
      method: 'wallet_addEthereumChain',
      params: [params, account.address]
    })
    .then((result: any) => {
      console.log(result)
    })
    .catch((error: Error) => {
      useMassage('error', error.message)
      console.error(error)
    })
}
