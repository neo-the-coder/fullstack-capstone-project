import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log('Logg')
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