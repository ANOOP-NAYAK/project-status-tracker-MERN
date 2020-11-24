import axios from 'axios'
import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import UserSVG from '../../images/users.png'
import '../scss/userpage.scss'

export default function UserList() {

    const [users, setUsers] = useState([])
    const [token, setToken] =useState('')

    const getUsers = async(token) => {
        const res = await axios.get('api/user', {
            headers:{Authorization : token}

        })
        // console.log(res)
        setUsers(res.data)
        //console.log(res.data)
    }

    useEffect(() => {
        const token =localStorage.getItem('TokenStore')
        setToken(token)
        if(token){
            getUsers(token)
        }
    },[])


    const deleteUser = async (id) =>{
        //console.log(id)
        try {
            
            if(token){
                await axios.delete(`api/user/${id}`,{
                    headers : { Authorization: token}
                })
                getUsers(token)
            }
        } catch (error) {
            window.location.href="/";
        }
    }
    return (
        <div>
 
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                    <button className="btn"><Link to="/create">Add new User</Link></button><br /><br />
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">PSI</th>
                            <th scope="col">Username</th>
                            <th scope="col">email</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.PSI}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td><Link to={`edit/${user._id}`}>EDIT</Link> | <Link to="/" onClick={() => deleteUser(user._id)}>DELETE</Link></td>
                                    </tr>
                    
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                    <div className="col-sm-3">
                        <img className="usersvg-img" src={UserSVG}></img>
                    </div>
                </div>
                </div>
        </div>
    )
}
