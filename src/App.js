import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
function App() {

  const [isLogin, setIsLogin] = useState(false)

  useEffect (() =>{
    const checkLogin = async () => {
      const token = localStorage.getItem('TokenStore')
      if(token){
          const verified = await axios.get('/admin/verify',{
            headers:{
              Authorization : token
            }
          })
          console.log(verified)
          setIsLogin(verified.data)
          if(verified.data === false) return localStorage.clear()
      }
      else{
        setIsLogin(false)
      }
    }
    checkLogin()
  },[])
  return (
    <div className="App">
      {
        isLogin 
        ? <Dashboard setIsLogin={setIsLogin}/> 
        : <Login setIsLogin={setIsLogin}/>
      }
    </div>
  );
}

export default App;
