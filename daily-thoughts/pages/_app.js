import '@/styles/globals.css'
import Layout from '@/components/Layout'
import Login from './auth/Login'
import Nav from '@/components/Nav'

export default function App({ Component, pageProps }) {
  return (
    <div className='p-8'>
      <Nav/>
      <Component {...pageProps} />
    </div>
  )
}
