import '@/styles/globals.css'
import Nav from '@/components/Nav'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

export default function App({ Component, pageProps }) {
  return (
    <div className=''>
    <div className='p-8 min-h-screen font-poppins '>
      <Nav />
      <ToastContainer
        autoClose={1500}
        limit={1}
        position='top-center'
      />
      <Component {...pageProps} />
    </div>
    </div>
  )
}
