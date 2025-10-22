import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        console.log('Registered')
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                        <form onSubmit={handleRegister}>
                            <label className='form-label' htmlFor="firstname">First name</label>
                            <input className="form-control" id="firstname" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                            <label className='form-label' htmlFor='lastName'>Last name</label>
                            <input className="form-control" id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                            <label className='form-label' htmlFor='email'>Email</label>
                            <input className="form-control" id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                            <label className='form-label' htmlFor='password'>Password</label>
                            <input className="form-control" id="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

                            <button className="btn btn-primary w-100 mb-3" type="submit">Register</button>
                        </form>
                {/* insert code here to create a button that performs the `handleRegister` function on click */}
                    <p className="mt-4 text-center">
                        Already a member? <a href="/app/login" className="text-primary">Login</a>
                    </p>
                     </div>
                </div>
            </div>
        </div>
     );
}

export default RegisterPage;
