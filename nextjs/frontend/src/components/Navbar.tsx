'use client'
import React, { useState, useEffect} from 'react'
import AccountDetails from './Wallet-Componets/AccountDetails'
import { useSwitchChain, useAccount } from 'wagmi'
import Link from 'next/link'


const Navbar = () => {
  const { chains, switchChain} = useSwitchChain()
  const { address } = useAccount();

  const [clientReady, setClientReady] = useState(false)

  useEffect(() => {
    setClientReady(true)
  }, [])

  if (!clientReady) return null // Prevent hydration errors
  return (
    <div>
      <div className="navbar bg-black shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><Link href='/mint'>Mint</Link></li>
              <li>
                <a>Check out</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Arts</a></li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" href='/'>Museum</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href='/mint'>Mint</Link></li>
            <li>
              <details>
                <summary>Switch Chain</summary>
                <ul className="p-2">
                  <li>{chains.map((chain) => (
                    <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
                      {chain.name}
                    </button>
                  ))}</li>


                </ul>
              </details>
            </li>
            <li><a>Contact us</a></li>
            {address && <li><Link href={`/${address}`}>Artifacts</Link></li>}
            
          </ul>
        </div>
        <div className="navbar-end">
          <AccountDetails />
          {/* <a className="btn">Connect Wallet</a> */}
        </div>
      </div>
    </div>
  )
}
export default Navbar;