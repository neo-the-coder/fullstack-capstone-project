import React from 'react';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-2">
            <a className="navbar-brand" href="/">GiftLink</a>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {/* Task 1: Add links to Home and Gifts below*/}
                    <li>
                        <a className="nav-link" href="/home.html">Home</a>
                    </li>
                    <li>
                        <a className="nav-link" href="/app">Gifts</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
