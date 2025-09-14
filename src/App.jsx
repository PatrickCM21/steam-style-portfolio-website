import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router'
import { CookiesProvider } from 'react-cookie';

import Layout from './layouts/Layout'
import './components/Header.css'

import Profile from './components/Profile'
import './components/Profile.css'
import Wishlist from './components/Wishlist'
import Store from './components/Store'
import './components/Store.css'
import Community from './components/Community'
import Game from './components/Game'

const routesArray = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="store" replace/>},
      { path: "store", element: <Outlet />, children: [
          { index: true , element: <Store /> },
          { path: "wishlist", element: <Wishlist />},
          { path: ":id", element: <Game />}
      ]},
      { path: "community", element: <Community />},
      { path: "profile", element: <Profile />},
    ]
  }
]

const router = createBrowserRouter(routesArray)

function App() {

  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <RouterProvider router={router}/>
    </CookiesProvider>
  )
}

export default App
