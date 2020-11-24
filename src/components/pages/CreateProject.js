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


export default function CreateProject() {

    const [names, setNames] =useState([])
    const [groups,setGroups] =useState([]);
    const [personName, setPersonName] = useState([]);
    const [groupName, setGroupName] = useState([]);
    const [project, setProject] = useState({
        projectname : '',
        projectdescription : '',
        client: '',
        members:[],
        assigneddate:'',
        ETAdate:'',
        progress:''
    })
    const history = useHistory()

    const onChangeInput = e => {
        const{name, value} = e.target;
        setProject({...project, [name]:value})
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
        const getGroups = async () =>{
            const token = localStorage.getItem('TokenStore')
            const res = await axios.get('/api/group/',{
                headers: {Authorization: token}
            })
            let tempgroup=[] 
            for(let i=0;i<res.data.length;i++)
                {
                    tempgroup.push(res.data[i].groupname)
                }
                setNames(tempgroup)
            //console.log(res.data)
        }
        getGroups()
      },[])

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
            //console.log(res.data)
        }
        getNames()
      },[])
    
      const handleChangeSelect = (event) => {
        setPersonName(event.target.value);
        setGroupName(event.target.value);
      };

    const createProject = async e => {
        e.preventDefault()
        project.members=personName
        try{
            const token = localStorage.getItem('TokenStore')
            if(token){
                const {projectname, projectdescription, client,members,assigneddate,ETAdate,progress} = project;
                const newProject = {
                    projectname, projectdescription, client,members,assigneddate,ETAdate,progress
                }
                await axios.post('/api/project', newProject,{
                    headers : {Authorization : token}
                })
                alert("Project Added Successfully..!!")
                return history.push('/project_list')
            }
        }catch(err){
            window.location.href="/project_list";
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
                                <h2>Create New Project</h2>
                            </div>
                            <form onSubmit={createProject} autoComplete="off">
                               <input type="text" value={project.projectname} 
                                id="projectname" name="projectname" required 
                                placeholder="projectname" onChange={onChangeInput}></input>

                               <input type="text" value={project.projectdescription} id="projectdescription" 
                                name="projectdescription" required placeholder="Description"
                                onChange={onChangeInput}></input>

                                <input type="text" value={project.client} 
                                id="client" name="client" required 
                                placeholder="client" onChange={onChangeInput}></input>

                                {/* <input type="text" value={project.members} 
                                id="members" name="members" required 
                                placeholder="members" onChange={onChangeInput}></input> */}

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
                                        {/* {
                                            groups.map((group) => (
                                                <MenuItem key={group} value={group}>
                                                    <Checkbox checked={groupName.indexOf(group) > -1} />
                                                    <ListItemText primary={group} />
                                                </MenuItem>
                                            ))  
                                        } */}
                                        {
                                            names.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))
                                        }
                                </Select>

                                <input type="date" value={project.assigneddate} 
                                id="assigneddate" name="assigneddate" required 
                                placeholder="Assigneddate" onChange={onChangeInput}></input>

                                <input type="date" value={project.ETAdate} 
                                id="ETAdate" name="ETAdate" required 
                                placeholder="ETAdate" onChange={onChangeInput}></input>

                                <input type="text" value={project.progress} 
                                id="progress" name="progress" required 
                                placeholder="progress" onChange={onChangeInput}></input>

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

