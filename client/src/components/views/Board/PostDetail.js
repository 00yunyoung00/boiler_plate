import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
      maxWidth: 800,
      backgroundColor: theme.palette.background.paper,
      margin:"auto",
      padding:10,
      height:800,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(2),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
  }));

function PostDetail({ post, user, onDeletePost }) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.section1}>
                <Grid container alignItems="center">
                <Grid item xs>
                    <Typography gutterBottom variant="h4">
                    {post.title}
                    </Typography>
                </Grid>
                </Grid>
                <Grid>
                    <Grid>
                        <Typography color="textSecondary" variant="body2">
                        작성날짜 : {post.date}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography color="textSecondary" variant="body2">
                        작성자 : {post.author}
                        </Typography>
                    </Grid>
                </Grid>
                
            </div>
            <Divider variant="middle" />
            <div className={classes.section2}>
                {post.content}
            </div>
            <Divider variant="middle" />
            <div className={classes.section2}>
                <Typography gutterBottom variant="body1">
                Select type
                </Typography>
                <div>
                <Chip className={classes.chip} label="Extra Soft" />
                <Chip className={classes.chip} color="primary" label="Soft" />
                <Chip className={classes.chip} label="Medium" />
                <Chip className={classes.chip} label="Hard" />
                </div>
            </div>
            <Divider variant="middle" />
            <div className={classes.section2}>
                {post.conmments}
            </div>
              {
                post.authorId===user ? 
                  <div className={classes.section2}>
                    <Button onClick={onDeletePost}>delete</Button>
                  </div> 
                  : null
              }
        </div>
    )
}

export default PostDetail
