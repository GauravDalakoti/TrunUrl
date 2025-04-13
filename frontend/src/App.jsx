import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster position="top-right" toastOptions={{

        success: {

          theme: {

            primary: '#4aed88'
          }

        }
      }
      }>

      </Toaster>
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    </>
  )
}

export default App
