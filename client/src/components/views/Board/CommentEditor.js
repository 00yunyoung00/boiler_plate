import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { writeComment } from '../../../_actions/board_actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

function CommentEditor({ postId }) {
    const dispatch = useDispatch()

    const [Content, setContent] = useState("")
    const user = localStorage.getItem("userName")

    const onContentChange = (e) =>{
        setContent(e.currentTarget.value)
    }

    const onSubmit = (e)=>{
        //e.preventDefault()

        let body={
            id:postId,
            content:Content,
            author:user
        }

        dispatch(writeComment(body))
        .then(response=>{
            if(response.payload.addCommentSuccess){
                console.log("add comment success")
            }else{
                alert("failed to write comment")
            }
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <TextField 
                value={Content}
                onChange={onContentChange}
                type="text"
                rows={3}
                variant="outlined"
                fullWidth
            />
            <Button type="submit" style={{ margin:10, paddingLeft:10, paddingRight:10}}>Submit</Button>
        </form>
    )
}

export default CommentEditor
