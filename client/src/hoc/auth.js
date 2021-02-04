import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_actions'

export default function (SpecificComponent, option, adminRoute=null){

    //option 
    //  null : 아무나 출입 가능
    //  true : 로그인한 유저만 출입 가능
    //  false: 로그인한 유저는 출입 불가능

    //adminRoute
    //  true일 경우 admin만 출입가능

    function AuthenticationCheck(props){
        console.log("in auth")

        const dispatch = useDispatch()

        useEffect(()=>{
            dispatch(auth()).then(response=>{
                console.log(response)

                if(!response.payload.isAuth){
                    //로그인 하지 않은 상태
                    if(option){
                        props.history.push('/login')
                    }
                }else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        //admin page이지만 admin권한 없는 경우
                        //admin page는 로그인 한 상태가 디폴트
                        props.history.push('/')
                    }else{
                        if(option === false)
                        props.history.push('/')
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}