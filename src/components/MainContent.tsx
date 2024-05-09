import { useNetwork } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function MainContent() {
  const { chain } = useNetwork()
  return (
    <div>
      <h1>WalletConnect v2 Test</h1>
      <ConnectButton />
      <p>chain:</p>
      <p>{chain?.name}</p>
    </div>
  )
}
