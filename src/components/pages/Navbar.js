import React from 'react'
import {Link} from 'react-router-dom'
import '../scss/navbar.scss'
export default function Navbar({setIsLogin}) {

    const LogoutSubmit= () =>{
        localStorage.clear()
        setIsLogin(false)
    }

    return (
        <div>
            <header>  
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="navbar-brand" href="/">PROJECT STATUS TRACKER</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                    <li class="nav-item active">
                        <Link class="nav-link" to="/">User</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/project_list">Projects</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/group_list">Group</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/" onClick={LogoutSubmit}>Logout</Link>
                    </li>
                    </ul>
                </div>
            </nav>
            </header>
        </div>
    )
}
