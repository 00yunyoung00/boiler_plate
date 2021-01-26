import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { logoutUser } from '../../../_actions/user_actions';

function LandingPage(props) {

    const dispatch = useDispatch();

    const logoutHandler = ()=>{

        dispatch(logoutUser()).then(response=>{
            if(response.payload.success){
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
        </div>
    )
}

export default withRouter(LandingPage)
