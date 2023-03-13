import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './layouts/havbar'
import Footer from './layouts/footer'
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'
import ProtectedRoute from './layouts/ProtectedRoute'

const noAuthRequired =['/','/signin', 'signup', '/about']

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return <AuthContextProvider>
    
      
        {/* <meta charset="utf-8" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        {/* <title>KitchenGenie - вашият приятел в кухнята</title> */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"/>

        {/* <meta name="description" content="Kitchen Genie " /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/favicon.ico" />
      

    <Navbar />
    {noAuthRequired.includes(router.pathname)?(
    <Component {...pageProps} />
    ):(
      <ProtectedRoute> 
        <Component {...pageProps} />
      </ProtectedRoute>
    )}
    <Footer />

  </AuthContextProvider>
}
