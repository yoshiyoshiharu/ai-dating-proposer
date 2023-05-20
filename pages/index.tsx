import Head from 'next/head'
import Header from './components/Header'

const Main = () => {
  return (
    <>
      <Head>
        <title>AIデートプラン提案アプリ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
    </>
  )
}

export default Main
