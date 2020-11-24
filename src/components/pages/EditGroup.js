import '../scss/createuserpage.scss'
import axios from 'axios'
import React, {useState,useEffect} from 'react'
import UserAddSVG from '../../images/adduser.png'
import {useHistory} from 'react-router-dom'

export default function EditGroup({match}) {

    const [group, setGroup] = useState({
        groupname : '',
        users : [],
        id:''
    })
    const history = useHistory()

    useEffect(() => {
        const getGroup = async () =>{
            const token = localStorage.getItem('TokenStore')
            if(match.params.id){
                const res = await axios.get(`/api/group/${match.params.id}`,{
                    headers: {Authorization: token}
                })
                setGroup({
                    groupname : res.data.groupname,
                    users:res.data.users,
                    id : res.data._id
                })
                console.log(match.params.id)
                console.log(res)
            }
        }
        getGroup()
    },[match.params.id])

    const onChangeInput = e => {
        const{name, value} = e.target;
        setGroup({...group, [name]:value})
    }

    const editGroup = async e => {
        e.preventDefault()
        try{
            const token = localStorage.getItem('TokenStore')
            if(token){
                const {groupname, users, id} = group;
                const newGroup = {
                    groupname, users
                }
                await axios.put(`/api/group/${id}`, newGroup,{
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
                                <h2>Edit Group</h2>
                            </div>
                            <form onSubmit={editGroup} autoComplete="off">
                               <input type="text" value={group.groupname} 
                                id="groupname" name="groupname" required 
                                placeholder="Groupname" onChange={onChangeInput}></input>

                               <input type="text" value={group.users} id="users" 
                                name="users" required placeholder="Users"
                                onChange={onChangeInput}></input>
                                <br/><br/>
                               <button className="btn btn-default" type="submit">Save</button><br/><br/>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

