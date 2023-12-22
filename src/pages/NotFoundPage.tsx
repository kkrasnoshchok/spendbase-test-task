import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = (): JSX.Element => {
    const navigate = useNavigate()
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em' }}>Oops 404!</h1>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                Homepage
            </span>
        </div>
    )
}

export default NotFoundPage
