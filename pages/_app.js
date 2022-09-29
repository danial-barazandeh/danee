import Layout from '../components/Layout';
import Footer from "../components/Footer";
import '../styles/globals.css'
import '../styles/Footer.moudle.css'
import { SessionProvider } from "next-auth/react"

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<SessionProvider session={session}>
      <Component {...pageProps} />
  </SessionProvider>)

}

export default MyApp
