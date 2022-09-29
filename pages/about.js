import Head from 'next/head'
import Nav from '../components/Nav'
import Layout from '../components/Layout'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div>
      <h1>This is about</h1>
    </div>
  )
}


About.getLayout = function getLayout(page) {
  return (
    <>
    <Layout>
      <Nav></Nav>
        {page}
    </Layout>
    <Footer></Footer>
    </>
  )
}

