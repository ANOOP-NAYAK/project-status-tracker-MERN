import '../scss/createuserpage.scss'
import axios from 'axios'
import React, {useState,useEffect} from 'react'
import UserAddSVG from '../../images/adduser.png'
import {useHistory} from 'react-router-dom'

export default function EditUser({match}) {

    const [user, setUser] = useState({
        PSI : '',
        username : '',
        email: '',
        id:''
    })
    const history = useHistory()

    useEffect(() => {
        const getUser = async () =>{
            const token = localStorage.getItem('TokenStore')
            if(match.params.id){
                const res = await axios.get(`/api/user/${match.params.id}`,{
                    headers: {Authorization: token}
                })
                setUser({
                    PSI : res.data.PSI,
                    username:res.data.username,
                    email: res.data.email,
                    id : res.data._id
                })
                console.log(match.params.id)
                console.log(res)
            }
        }
        getUser()
    },[match.params.id])

    const onChangeInput = e => {
        const{name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const editUser = async e => {
        e.preventDefault()
        try{
            const token = localStorage.getItem('TokenStore')
            if(token){
                const {PSI, username, email, id} = user;
                const newUser = {
                    PSI, username, email
                }
                await axios.put(`/api/user/${id}`, newUser,{
                    headers : {Authorization : token}
                })
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
                                <h2>Edit User</h2>
                            </div>
                            <form onSubmit={editUser} autoComplete="off">
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
