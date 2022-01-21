// style
import './Notfound.css'
// hooks
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function Notfound(){
    const navigate = useNavigate();
    
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        },5000)
    },[])
    return(
        <div style={{minWidth: '100vw', minHeight: '80vh',marginTop: '20vh',display: 'flex',justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(100,100,100)'}}>
            <h1 style={{fontSize: '5rem'}}>404 Not Found</h1>
            <h2>You will be redirected to Home</h2>
        </div>
    )
}