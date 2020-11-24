import React, {useState,useEffect} from 'react'
import ViewSVG from '../../images/viewproject.png'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

export default function ViewProject({match}) {

    const [project, setProject] = useState({
        projectname : '',
        projectdescription : '',
        client: '',
        members:[],
        assigneddate:'',
        ETAdate:'',
        progress:'',
        id:'',
        project_status:''
    })
    const history = useHistory()

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
                //console.log(match.params.id)
                //console.log(res)
            }
        }
        getProject()
    },[match.params.id])




    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <img className="usersvg-img" src={ViewSVG}/>
                    </div>
                    <div className="col-sm-8">
                        <div className="project-view-box" >
                            <div className="project-title">
                                <h1>Project name: {project.projectname}</h1>
                            </div> <br />
                            <h5>Project Description: {project.projectdescription}</h5> <br />
                            <h5>Project Description: {project.client}</h5> <br />
                            <h5>Members: {project.members.join(', ')}</h5> <br />
                            <h5>Assigned date : {project.assigneddate}</h5> <br />
                            <h5>ETAdate: {project.ETAdate}</h5> <br />
                            <h5>progress: {project.progress}</h5> <br /> 
                            <button className="btn"><Link to="/project_list">Back</Link></button>
                            <br /> <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
