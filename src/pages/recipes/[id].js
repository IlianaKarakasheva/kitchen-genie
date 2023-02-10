import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useParams } from 'react-router-dom'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Recipe() {
    const router = useRouter()
    console.log(router.query)
    const{id} = router.query
  return (

    <h1>recipe {id}</h1>
  )
    }
