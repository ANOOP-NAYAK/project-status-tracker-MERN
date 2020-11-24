import React from 'react'
import Header from '../components/pages/Navbar';
import Home from '../components/pages/UserList';
import CreateUser from '../components/pages/CreateUser';
import EditUser from '../components/pages/EditUser';
import CreateProject from '../components/pages/CreateProject';
import ProjectList from '../components/pages/ProjectList';
import EditProject from '../components/pages/EditProject';
import GroupList from '../components/pages/GroupList';
import CreateGroup from '../components/pages/CreateGroup'
import EditGroup from '../components/pages/EditGroup'
import ViewProject from '../components/pages/ViewProject'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'


export default function Dashboard({setIsLogin}) {
    return (
        <Router>
            <div className="dashboard-page">
                <Header setIsLogin={setIsLogin}/>
                <section>
                    <Route path="/" component={Home} exact />
                    <Route path="/create" component={CreateUser} />
                    <Route path="/edit/:id" component={EditUser} />

                    <Route path="/project_create" component={CreateProject} />
                    <Route path="/project_list" component={ProjectList} />
                    <Route path="/project_edit/:id" component={EditProject} />
                    <Route path="/project/:id" component={ViewProject} />

                    <Route path="/group_edit/:id" component={EditGroup} />
                    <Route path="/group_create" component={CreateGroup} />
                    <Route path="/group_list" component={GroupList} />
                </section>
            </div>
        </Router>
    )
}
