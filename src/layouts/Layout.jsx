import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../components/Header.css'

export default function Layout() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}