import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import App from './components/App'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Thanya Iyer - rest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <App />


      </main>



    </div>
  )
}
