import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions'


function RegisterPage(props) {

    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailChange = (e) =>{
        setEmail(e.currentTarget.value)
    }

    const onNameChange = (e) =>{
        setName(e.currentTarget.value)
    }

    const onPasswordChange = (e) =>{
        setPassword(e.currentTarget.value)
    }
    
    const onConfirmPasswordChange = (e) =>{
        setConfirmPassword(e.currentTarget.value)
    }

    const onSubmit = (e) =>{
        //이거 없으면 버튼 누를때마다 일 하기전에 refresh됨
        e.preventDefault();

        //password, confirmpassword check
        if(Password !== ConfirmPassword){
            return alert('비밀번호가 일치하지 않습니다.')
        }

        //서버로 보낼거임
        let body = {
            email:Email,
            password:Password,
            name:Name
        }

        dispatch(registerUser(body))
        .then(response=>{
            if(response.payload.success){
                props.history.push("/login")
            }else{
                alert("failed to sign up")
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
                
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameChange} />
                
                <label>Passworld</label>
                <input type="password" value={Password} onChange={onPasswordChange} />

                <label>Confirm Passworld</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordChange} />

                <br/>
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
