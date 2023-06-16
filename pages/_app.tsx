import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <style jsx global>{`
  html {
    font-family: ${playfair.style.fontFamily};
  }
`}</style>
<Component {...pageProps} />
</>);
}
