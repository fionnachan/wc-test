import React from 'react'
import { twMerge } from 'tailwind-merge'
import '@rainbow-me/rainbowkit/styles.css'

export type LayoutProps = {
  children: React.ReactNode
}

export function Layout(props: LayoutProps) {
  return (
    <div className={twMerge('relative flex-col')}>
      <div className="relative flex flex-col sm:min-h-screen">
        <div className="flex flex-row">
          <main className="grow">{props.children}</main>
        </div>
      </div>
    </div>
  )
}
