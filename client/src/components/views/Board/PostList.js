import React from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  
  const useStyles = makeStyles({
    table: {
      minWidth: 500,
      margin:100,
      width:"70%",
    },
    page: {
        minHeight:1000,
    }
  });
  

function PostList({ posts }) {

    console.log(posts)

    const classes = useStyles();

        return (
            <TableContainer className={classes.page} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>제목</StyledTableCell>
                <StyledTableCell align="right">작성자</StyledTableCell>
                <StyledTableCell align="right">작성날짜</StyledTableCell>
                <StyledTableCell align="right">조회수</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {posts.posts.map((posts) => (
                <StyledTableRow key={posts._id}>
                <StyledTableCell component="th" scope="row">
                    <Link to={`/post/${posts._id}`}>{posts.title}</Link>
                </StyledTableCell>
                <StyledTableCell align="right">{posts.author}</StyledTableCell>
                <StyledTableCell align="right">{posts.date}</StyledTableCell>
                <StyledTableCell align="right">{posts.count}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        )
    
}

export default PostList
