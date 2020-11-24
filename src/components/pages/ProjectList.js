import axios from 'axios'
import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import ProjectSVG from '../../images/projectsvg.png'
import '../scss/userpage.scss'

export default function ProjectList() {

    const [projects, setProject] = useState([])
    const [token, setToken] =useState('')

    const getProject = async(token) => {
        const res = await axios.get('api/project', {
            headers:{Authorization : token}

        })
        // console.log(res)
        setProject(res.data)
        //console.log(res.data)
    }

    useEffect(() => {
        const token =localStorage.getItem('TokenStore')
        setToken(token)
        if(token){
            getProject(token)
        }
    },[])


    const deleteProject = async (id) =>{
        //console.log(id)
        try {
            
            if(token){
                await axios.delete(`api/project/${id}`,{
                    headers : { Authorization: token}
                })
                getProject(token)
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
                    <button className="btn"><Link to="/project_create">Add new Project</Link></button><br /><br/>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">Project Title</th>
                            <th scope="col">Client</th>
                            <th scope="col">Progress</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                projects.map(project => (
                                    <tr key={project._id}>
                                        <td>{project.projectname}</td>
                                        <td>{project.client}</td>
                                        <td>{project.progress < 100 ? "Inprogress":"Completed"}</td>
                                        <td><Link to={`project/${project._id}`}>VIEW</Link> | <Link to={`project_edit/${project._id}`}>EDIT</Link> | <Link to="/" onClick={() => deleteProject(project._id)}>DELETE</Link></td>
                                    </tr>
                    
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                    <div className="col-sm-3">
                        <img className="usersvg-img" src={ProjectSVG}></img>
                    </div>
                </div>
                </div>
        </div>
    )
}

