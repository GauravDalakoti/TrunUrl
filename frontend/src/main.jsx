import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import SignUp from './components/signUp/SignUp.jsx'
import SignIn from './components/singIn/SignIn.jsx'
import About from './components/about/About.jsx'
import ContactUs from './components/contactUs/ContactUs.jsx'
import PageNotFound from './components/pageNotFound/PageNotFound.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path='/' element={<App />}>

      <Route path='' element={<Home />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact-us' element={<ContactUs />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='*' element={<PageNotFound />} />

    </Route>
  )

)

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider future={{ v7_partialHydration: true }} router={router}>



    </RouterProvider>
  </Provider>
)
