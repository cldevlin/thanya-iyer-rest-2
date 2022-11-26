import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import App from './components/App'

import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('./components/App'), {
  ssr: false
})

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>rest</title>
        <meta name="description" content="Thanya Iyer - rest" />
        <link rel="icon" href="/green-daisy-flower.png" />
      </Head>

      <main className={styles.main}>

        <DynamicComponentWithNoSSR />


      </main>



    </div>
  )
}
