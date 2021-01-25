import Axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions'

function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailChange = (e) =>{
        setEmail(e.currentTarget.value)
    }

    const onPasswordChange = (e) =>{
        setPassword(e.currentTarget.value)
    }

    const onSubmit = (e) =>{
        //이거 없으면 버튼 누를때마다 일 하기전에 refresh됨
        e.preventDefault();

        //서버로 보낼거임
        let body = {
            email:Email,
            password:Password
        }

        dispatch(loginUser(body))
        .then(response=>{
            if(response.payload.loginSuccess){
                props.history.push('/')
            }else{
                alert('error');
            }
        });

    }

    return (
        <div style={{ 
            display:'flex', justifyContent:'center', alignItems:'center',
            width:'100%', height:'100vh'
         }}>
            <form style={{ display:'flex', flexDirection:'column' }}
                onSubmit={onSubmit}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailChange} />
                <label>Passworld</label>
                <input type="password" value={Password} onChange={onPasswordChange} />
                <br/>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
