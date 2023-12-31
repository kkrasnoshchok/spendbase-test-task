import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/Home'
import NotFoundPage from './pages/NotFoundPage'
import './styles/main.scss'

const RootComponent = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path={'/'} element={<HomePage />} />
            </Routes>
        </Router>
    )
}

export default RootComponent
