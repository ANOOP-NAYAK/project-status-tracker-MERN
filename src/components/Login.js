import React ,{useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../components/scss/login.scss'
import LoginSVG from '../images/login.png'

export default function Login({setIsLogin}) {
    const [admin,setAdmin] = useState({name: '',email:'',password:'' })
    const [err,setErr] = useState('')

    const onChangeInput = e => {
        const {name, value} = e.target;
        setAdmin({...admin,[name]:value})
        setErr('')
    }

    // const registerSubmit = async e =>{
    //     e.preventDefault()
    //     try {
    //         const res = await axios.post('/admin/register',{
    //             username: admin.name,
    //             email:admin.email,
    //             password:admin.password
    //         })
    //         setAdmin({name:'' ,email:'',password:''})
    //         setErr(res.data.msg)
    //     } catch (err) {
    //         err.response.data.msg && setErr(err.response.data.msg)
    //     }
    // }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post('/admin/login',{
                email:admin.email,
                password:admin.password
            })
            setAdmin({name:'' ,email:'',password:''})
            localStorage.setItem('TokenStore',res.data.token)
            setIsLogin(true)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    return (
        <section>
            <div className="Login">
            <nav class="navbar navbar-expand-lg navbar-light bg">
                <a class="navbar-brand" href="/">PROJECT STATUS TRACKER</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </nav>
            <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <div >
                        <img className="svg-png" src={LoginSVG}></img>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-style">
                        <div className="form-header">
                            <h2>Admin Login</h2>
                        </div>
                        <form onSubmit={loginSubmit}>
                            <input className="input-feild" type="email" name="email" id="login-email" 
                                placeholder="Email" required value={admin.email} 
                                onChange={onChangeInput}/>
                            <br/>
                            <input type="password" name="password" id="login-password" 
                                placeholder="Password" required value={admin.password} 
                                autoComplete="true" 
                                onChange={onChangeInput}/><br/><br/>
                                
                                <button className="btn btn-default" type="submit">Login</button>
                            <h3>{err}</h3><br/>
                        </form>
                    </div>
                </div>
                </div>
            </div>
                
            </div>
            <div className="register">
            {/* <h2>Register</h2>
                <form onSubmit={registerSubmit}>
                    <input type="text" name="name" id="register-name" placeholder="username" 
                        required value={admin.name} 
                        onChange={onChangeInput}/>
                    <input type="email" name="email" id="register-email" placeholder="Email" 
                        required value={admin.email} 
                        onChange={onChangeInput}/>
                    <input type="password" name="password" id="register-password" 
                        placeholder="Password" required value={admin.password} 
                        autoComplete="true" onChange={onChangeInput}/>
                    <button type="submit">Register</button>
                    <h3>{err}</h3>
                </form> */}
            </div>
        </section>
    )
}
