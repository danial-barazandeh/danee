import '../styles/globals.css'
import '../styles/Footer.moudle.css'

function MyApp({
  Component,
  pageProps: {...pageProps },
}) {

  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
      <Component {...pageProps} />
  )

}

export default MyApp
