import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig, useNetwork } from 'wagmi'
import { useEffect, useState } from 'react'

import {
  ArbQueryParamProvider,
  useArbQueryParams
} from '../../hooks/useArbQueryParams'
import { sanitizeQueryParams } from '../../util'
import { getProps } from '../../util/wagmi/setup'
import { MainContent } from '../MainContent'

// We're doing this as a workaround so users can select their preferred chain on WalletConnect.
//
// https://github.com/orgs/WalletConnect/discussions/2733
// https://github.com/wagmi-dev/references/blob/main/packages/connectors/src/walletConnect.ts#L114
const searchParams = new URLSearchParams(window.location.search)
const targetChainKey = searchParams.get('walletConnectChain')

const { wagmiConfigProps, rainbowKitProviderProps } = getProps(targetChainKey)

// Clear cache for everything related to WalletConnect v2.
//
// TODO: Remove this once the fix for the infinite loop / memory leak is identified.
Object.keys(localStorage).forEach(key => {
  if (key === 'wagmi.requestedChains' || key.startsWith('wc@2')) {
    localStorage.removeItem(key)
  }
})

function ConnectedChainSyncer() {
  const [shouldSync, setShouldSync] = useState(false)
  const [didSync, setDidSync] = useState(false)

  const [{ sourceChain, destinationChain }, setQueryParams] =
    useArbQueryParams()
  const { chain } = useNetwork()

  useEffect(() => {
    if (shouldSync) {
      return
    }

    // Only sync connected chain to query params if the query params were not initially provided
    if (
      typeof sourceChain === 'undefined' &&
      typeof destinationChain === 'undefined'
    ) {
      setShouldSync(true)
    }
  }, [shouldSync, sourceChain, destinationChain])

  useEffect(() => {
    // When the chain is connected and we should sync, and we haven't synced yet, sync the connected chain to the query params
    if (chain && shouldSync && !didSync) {
      const {
        sourceChainId: sourceChain,
        destinationChainId: destinationChain
      } = sanitizeQueryParams({
        sourceChainId: chain.id,
        destinationChainId: undefined
      })

      setQueryParams({ sourceChain, destinationChain })
      setDidSync(true)
    }
  }, [chain, shouldSync, didSync, setQueryParams])

  return null
}

export default function App() {
  return (
    <ArbQueryParamProvider>
      <WagmiConfig {...wagmiConfigProps}>
        <RainbowKitProvider {...rainbowKitProviderProps}>
          <ConnectedChainSyncer />
          <MainContent />
        </RainbowKitProvider>
      </WagmiConfig>
    </ArbQueryParamProvider>
  )
}
