import '../scss/createuserpage.scss'
import axios from 'axios'
import React, {useState,useEffect} from 'react'
import UserAddSVG from '../../images/adduser.png'
import {useHistory} from 'react-router-dom'
//import Slider, { Range } from 'rc-slider';
//import 'rc-slider/assets/index.css';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


export default function EditProject({match}) {

    const [names, setNames] =useState([])
    const [personName, setPersonName] = useState([]);
    const [Progress, setProgress] = useState(0);
    const [project, setProject] = useState({
        projectname : '',
        projectdescription : '',
        client: '',
        members:[],
        assigneddate:'',
        ETAdate:'',
        progress: '',
        id:'',
        project_status:'',
        personName:[]
    })
    const history = useHistory()
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 550,
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

    useEffect(() => {
        const getProject = async () =>{
            const token = localStorage.getItem('TokenStore')
            let status
            if(match.params.id){
                const res = await axios.get(`/api/project/${match.params.id}`,{
                    headers: {Authorization: token}
                })
                if(res.data.progress < 100){
                    status="Inprogress"
                }
                else{
                    status="Completed"
                }
                setProject({
                    projectname : res.data.projectname,
                    projectdescription : res.data.projectdescription,
                    client: res.data.client,
                    members:res.data.members,
                    assigneddate:res.data.assigneddate,
                    ETAdate:res.data.ETAdate,
                    progress:res.data.progress,
                    id : res.data._id,
                    project_status: status

                })
                setProgress([parseInt(res.data.progress)])

                setPersonName(res.data.members);
                //console.log(match.params.id)
                //console.log(res)
                console.log(Progress)
            }
        }
        getProject()
    },[match.params.id])

    const onChangeInput = e => {
        const{name, value} = e.target;
        setProject({...project, [name]:value})
    }

    const handleChangeSelect = (event) => {
        setPersonName(event.target.value);
        console.log(event.target.value)
      };

    const editProject = async e => {
        e.preventDefault()
        project.members=personName
        try{
            const token = localStorage.getItem('TokenStore')
            if(token){
                const {projectname, projectdescription, client,members,assigneddate,ETAdate,progress,id} = project;
                const newProject = {
                    projectname, projectdescription, client,members,assigneddate,ETAdate,progress
                }
                await axios.put(`/api/project/${id}`, newProject,{
                    headers : {Authorization : token}
                })
                return history.push('/')
            }
        }catch(err){
            window.location.href="/project_list";
        }
    }

    function valuetext(value) {
        return `${value}`;
      }

    const handleChange = (event,newValue) =>{
        console.log(newValue)
        let temp = {... project}
        temp.progress=newValue[0]
        setProject(temp)
        console.log(project)   
    };

    // const marks = [
    //     {
    //     value: 0,
    //     label: '0°C',
    //     },
    //     {
    //     value: 20,
    //     label: '20°C',
    //     },
    //     {
    //     value: 37,
    //     label: '37°C',
    //     },
    //     {
    //     value: 100,
    //     label: '100°C',
    //     },
    //     ];

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
                                <h2>Edit Project</h2>
                            </div>
                            <form onSubmit={editProject} autoComplete="off">
                               <input type="text" value={project.projectname} 
                                id="projectname" name="projectname"  
                                placeholder="projectname" onChange={onChangeInput}></input>

                               <input type="text" value={project.projectdescription} id="projectdescription" 
                                name="projectdescription"  placeholder="Description"
                                onChange={onChangeInput}></input>

                                <input type="text" value={project.client} 
                                id="client" name="client"  
                                placeholder="client" onChange={onChangeInput}></input>

                                {/* <input type="text" value={project.members} 
                                id="members" name="members"  
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
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={personName.indexOf (name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}

                                        {/* {names.map((name) => ( 
                                            <MenuItem  value={name}>
                                                <Checkbox checked={personName.indexOf(project.members) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))} */}
                                </Select>
                                

                                <input type="date" value={project.assigneddate} 
                                id="assigneddate" name="assigneddate"  
                                placeholder="Assigneddate" onChange={onChangeInput}></input>

                                <input type="date" value={project.ETAdate} 
                                id="ETAdate" name="ETAdate" 
                                placeholder="ETAdate" onChange={onChangeInput}></input>

                                {/* <input type="text" value={project.project_status} readOnly 
                                id="progress" name="progress" required 
                                placeholder="progress" onChange={onChangeInput}></input><br/><br/> */}

                                {/* <Slider className="slider-style" 
                                    defaultValue={0}
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={5}
                                    marks
                                    min={0}
                                    max={100}
                                    valueLabelDisplay="auto"
                                    onChange={onChange} 
                                /> */}
                                <br/><br/>
                            <div className="select-tag">
                                <label>Mark progress here:</label>

                                {/* <Slider         
                                    defaultValue={progress}         
                                    step={10}        
                                    marks={marks}         
                                    valueLabelDisplay="auto"       
                                /> */}
                                <Slider
                                    key={`slider-${Progress}`}
                                    defaultValue={Progress}
                                    //getAriaValueText={valuetext}
                                    //aria-labelledby="discrete-slider-small-steps"
                                    step={10}
                                    marks
                                    min={0}
                                    max={100}
                                    onChange={handleChange}
                                    valueLabelDisplay="on"       
                                />
                            </div>
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


