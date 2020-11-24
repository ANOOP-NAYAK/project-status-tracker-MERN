import '../scss/createuserpage.scss'
import axios from 'axios'
import React, {useState,useEffect} from 'react'
import UserAddSVG from '../../images/adduser.png'
import {useHistory} from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

export default function CreateGroup() {

    const [names, setNames] =useState([])
    const [personName, setPersonName] = useState([]);
    const [group, setGroup] = useState({
        groupname : '',
        users : []
    })
    const history = useHistory()

    const onChangeInput = e => {
        const{name, value} = e.target;
        setGroup({...group, [name]:value})
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

      useEffect(() =>{
        const getNames = async () =>{
            const token = localStorage.getItem('TokenStore')
            const res = await axios.get('/api/user/',{
                headers: {Authorization: token}
            })
            let tempname=[] 
            for(let i=0;i<res.data.length;i++)
                {
                    tempname.push(res.data[i].username)
                }
                setNames(tempname)
            console.log(res.data)
        }
        getNames()
      },[])

      const handleChangeSelect = (event) => {
        setPersonName(event.target.value);
      };

    const createGroup = async e => {
        e.preventDefault()
        group.users=personName
        try{
            const token = localStorage.getItem('TokenStore')
            if(token){
                const {groupname, users} = group;
                const newGroup = {
                    groupname, users
                }
                await axios.post('/api/group', newGroup,{
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
                                <h2>Create New Group</h2>
                            </div>
                            <form onSubmit={createGroup} autoComplete="off">
                               <input type="text" value={group.groupname} 
                                id="groupname" name="groupname" required 
                                placeholder="Groupname" onChange={onChangeInput}></input>

                               {/* <input type="text" value={group.users} id="users" 
                                name="users" required placeholder="Name"
                                onChange={onChangeInput}></input> */}

                                <Select
                                        labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        value={personName}
                                        onChange={handleChangeSelect}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={personName.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                </Select>

                                <br/><br />
                               <button className="btn btn-default" type="submit">Save</button><br/><br/>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

