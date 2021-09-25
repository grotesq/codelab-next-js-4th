import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="container">
          <h1>Codelab Community</h1>
      </div>
    </Layout>
  )
}
