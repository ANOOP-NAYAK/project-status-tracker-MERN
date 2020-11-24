import axios from 'axios'
import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import GroupSVG from '../../images/group.png'
import '../scss/userpage.scss'

export default function GroupList() {

    const [groups, setGroup] = useState([])
    const [token, setToken] =useState('')

    const getGroup = async(token) => {
        const res = await axios.get('api/group', {
            headers:{Authorization : token}

        })
        // console.log(res)
        setGroup(res.data)
        //console.log(res.data)
    }

    useEffect(() => {
        const token =localStorage.getItem('TokenStore')
        setToken(token)
        if(token){
            getGroup(token)
        }
    },[])


    const deleteGroup = async (id) =>{
        //console.log(id)
        try {
            
            if(token){
                await axios.delete(`api/group/${id}`,{
                    headers : { Authorization: token}
                })
                getGroup(token)
            }
        } catch (error) {
            window.location.href="/group";
        }
    }
    return (
        <div>
 
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <button className="btn"><Link to="/group_create">Add new Group</Link></button><br/><br/>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">Group name</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                groups.map(group => (
                                    <tr key={group._id}>
                                        <td>{group.groupname}</td>
                                        <td><Link to={`group_edit/${group._id}`}>EDIT</Link> | <Link to="/" onClick={() => deleteGroup(group._id)}>DELETE</Link></td>
                                    </tr>
                    
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                    <div className="col-sm-3">
                        <img className="usersvg-img" src={GroupSVG}></img>
                    </div>
                </div>
                </div>
        </div>
    )
}

