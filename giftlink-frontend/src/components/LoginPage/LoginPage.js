import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();

    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app');
        }
    }, [navigate])

    const handleLogin = async () => {
        try{
            const response = await fetch(`/api/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);
    
                setIsLoggedIn(true);
                navigate('/app')
            } else {
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                setError("Wrong password. Try again.");
            }
          }catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    }

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-card p-4 border rounded">
              <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                <form onSubmit={handleLogin}>
                    <label className='form-label' htmlFor='email'>Email</label>
                    <input className="form-control" id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label className='form-label' htmlFor='password'>Password</label>
                    <input className="form-control" id="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button className="btn btn-primary w-100 mb-3" type="submit">Login</button>
                </form>

                <span style={{color:'red',height:'.5cm',display:'block',fontStyle:'italic',fontSize:'12px'}}>{error}</span>
                <p className="mt-4 text-center">
                    New here? <a href="/app/register" className="text-primary">Register Here</a>
                </p>

            </div>
          </div>
        </div>
      </div>
    )
}

export default LoginPage;