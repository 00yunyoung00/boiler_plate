import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { writeNewPost } from '../../../_actions/board_actions';

function Editor( props ) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.userData)

    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")

    const onTitleChange = (e) =>{
        setTitle(e.currentTarget.value)
    }

    const onContentChange = (e) =>{
        setContent(e.currentTarget.value)
    }

    const onSubmit = (e) =>{
        e.preventDefault();

        let body={
            title:Title,
            content:Content,
            author:user.name
        }

        dispatch(writeNewPost(body))
        .then(response=>{
            if(response.payload.success){
                props.history.push('/board')
            }else{
                alert("failed to write post")
            }
        })

    }

    return (
        <form onSubmit={onSubmit}>
        <div style={{ margin:"auto", padding:100 }}>
            <div style={{ margin:"auto", padding:10, paddingLeft:100, paddingRight:100}}>
                <TextField
                    id="outlined-multiline-static"
                    label="Title"
                    defaultValue="write Title here!"
                    variant="outlined"
                    fullWidth
                    type="text"
                    value={Title}
                    onChange={onTitleChange}
                />
            </div>
            <Divider/>
            <div style={{ margin:"auto", padding:10, paddingLeft:100, paddingRight:100 }}>
                <TextField
                    rows={15}
                    id="outlined-multiline-static"
                    label="Content"
                    multiline
                    defaultValue="write content here!"
                    variant="outlined"
                    fullWidth
                    type="text"
                    value={Content}
                    onChange={onContentChange}
                />
                <Button type="submit" style={{ margin:10, paddingLeft:10, paddingRight:10}} variant='outlined'>submit</Button>
            </div>
        </div>
        </form>
    )
}

export default withRouter(Editor)
