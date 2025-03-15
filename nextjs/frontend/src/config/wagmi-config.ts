import { http, createConfig } from 'wagmi'
import { eduChainTestnet, eduChain } from 'wagmi/chains'
// import { walletConnect, safe, coinbaseWallet } from "wagmi/connectors"

export const config = createConfig({
  chains: [eduChain, eduChainTestnet],
  connectors: [
    // injected(),
    // safe(),
    // coinbaseWallet(),
    // metaMask()
    // walletConnect({
    //   projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
    // })
  ],
  transports: {
    [eduChain.id]: http(),
    [eduChainTestnet.id]: http(),
  },
})