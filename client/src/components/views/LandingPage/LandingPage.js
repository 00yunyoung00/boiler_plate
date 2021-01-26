import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';

function LandingPage(props) {

    useEffect(()=>{
        axios.get('/api/hello').then(response=>{console.log(response)})
    }, [])

    const logoutHandler = ()=>{
      axios.get('/api/users/logout')
      .then(response=>{
          if(response.data.success){
              props.history.push('/login')
          }else{
              alert("failed to logout")
          }
      })
    }

    return (
        <div style={{ 
            display:'flex', justifyContent:'center', alignItems:'center',
            width:'100%', height:'100vh'
         }}>
            Landing page!
            <br />
            <button onClick={logoutHandler}>로그아웃</button>
        </div>
    )
}

export default withRouter(LandingPage)
