import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { addCustomNetwork } from '@arbitrum/sdk'

import {
  getCustomChainsFromLocalStorage,
  mapCustomChainToNetworkData
} from '../util/networks'

const App = dynamic(() => import('../components/App/App'), {
  ssr: false
})

export default function Index() {
  useEffect(() => {
    ;[...getCustomChainsFromLocalStorage()].forEach(chain => {
      try {
        addCustomNetwork({ customL2Network: chain })
        mapCustomChainToNetworkData(chain)
      } catch (_) {
        // already added
      }
    })
  }, [])

  return <App />
}
