'use client'
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { Museum } from "@/context/AppContext";
import { config } from '../config/wagmi-config';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <WagmiProvider config={config}>
      
      <QueryClientProvider client={queryClient}>
        <Museum>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />
        </Museum>
      </QueryClientProvider>

    </WagmiProvider>

  </>
  )
 
}
