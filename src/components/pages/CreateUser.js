import '../scss/createuserpage.scss'
import axios from 'axios'
import React, {useState,useEffect} from 'react'
import UserAddSVG from '../../images/adduser.png'
import {useHistory} from 'react-router-dom'

export default function CreateUser() {

    const [user, setUser] = useState({
        PSI : '',
        username : '',
        email: ''
    })
    const history = useHistory()

    const onChangeInput = e => {
        const{name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const createUser = async e => {
        e.preventDefault()
        try{
            const token = localStorage.getItem('TokenStore')
            if(token){
                const {PSI, username, email} = user;
                const newUser = {
                    PSI, username, email
                }
                await axios.post('/api/user', newUser,{
                    headers : {Authorization : token}
                })
                alert("User Added Successfully")
                return history.push('/')
            }
        }catch(err){
            window.location.href="/";
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">                      
                        <img className="useradd-svg" src={UserAddSVG}></img> 
                    </div>
                    <div className="col-sm-8">
                        <div className="form-style">
                            <div className="form-header">
                                <h2>Create New User</h2>
                            </div>
                            <form onSubmit={createUser} autoComplete="off">
                               <input type="text" value={user.PSI} 
                                id="PSI" name="PSI" required 
                                placeholder="PSI" onChange={onChangeInput}></input>

                               <input type="text" value={user.username} id="username" 
                                name="username" required placeholder="Name"
                                onChange={onChangeInput}></input>

                               <input type="text" value={user.email} id="email" 
                               name="email" required placeholder="email"
                               onChange={onChangeInput}></input><br/><br/>
                               <button className="btn btn-default" type="submit">Save</button><br/><br/>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
