import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

export default function Comment({ comment }) {
    const classes = useStyles();

    return (
        <div>
        <ListItem alignItems="flex-start">
            <ListItemText
            primary={
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    {comment.author}
                </Typography>
            }
            secondary={
                <React.Fragment>
                    {comment.content}
                </React.Fragment>
            }
            />
        </ListItem>
        <Divider component="li" />
        </div>
    )
}
