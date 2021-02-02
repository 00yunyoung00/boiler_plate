import React from 'react'

import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

function Editor() {
    return (
        <form>
        <div style={{ margin:"auto", padding:100 }}>
            <div style={{ margin:"auto", padding:10, paddingLeft:100, paddingRight:100}}>
                <TextField
                    id="outlined-multiline-static"
                    label="Title"
                    defaultValue="write Title here!"
                    variant="outlined"
                    fullWidth
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
                />
                <Button style={{ margin:10, paddingLeft:10, paddingRight:10}} variant='outlined'>submit</Button>
            </div>
        </div>
        </form>
    )
}

export default Editor
