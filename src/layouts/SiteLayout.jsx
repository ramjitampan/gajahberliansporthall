import { Outlet, useLocation } from 'react-router-dom'
import ScrollToHash from '../components/ScrollToHash'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function SiteLayout(){
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  return <div className="flex min-h-screen flex-col"><ScrollToHash/><Navbar/><main className={`flex-1 ${isHome?'':'pt-18 md:pt-20'}`}><Outlet/></main><Footer/></div>
}
