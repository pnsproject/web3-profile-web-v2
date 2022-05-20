export type PnsChainId = 1284 | 43113

console.log('NODE_ENV', import.meta.env.MODE)
export default {
  apiUrl: import.meta.env.VITE_API_URI || '',
  ipfsGateway: import.meta.env.VITE_IPFS_GATEWAY || '',
  pnsUrl: import.meta.env.VITE_PNS_URL || '',
  scrollBarWidth: 8,
  nftApps: {
    ensContract: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85'
  },
  chains: {
    1284: {
      chainId: '0x' + (1284).toString(16),
      chainName: 'Moonbeam',
      nativeCurrency: {
        name: 'Glimmer',
        symbol: 'GLMR',
        decimals: 18
      },
      rpcUrls: ['https://rpc.api.moonbeam.network'],
      blockExplorerUrls: ['https://moonbeam.network/networks/moonbeam/']
    },
    43113: {
      chainId: '0x' + (43113).toString(16),
      chainName: 'Avalanche Fuji Testnet',
      nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
      },
      rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
      blockExplorerUrls: ['https://cchain.explorer.avax-test.network']
    }
  },
  pnsChainId: Number(import.meta.env.VITE_DEFAULT_CHAIN || 1284)
}
