import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function GetAllMarks(){
    const {id} = useParams();
    const [message, setMessage] = useState("");
    const BASE_URL = global.config.BASE_URL;

    const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(BASE_URL + `/users/${id}/allMarks`)
      .then((response) => {
        setData(response.data);
        console.log(data)
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  }, []);


    return(
        <div>
            <h1>{data.name} {data.lastname}</h1>
            <Paper elevation={3}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Marks</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && Object.entries(data.marksByDate).map(([date, marks]) => (
                        <TableRow key={date}>
                            <TableCell>{date}</TableCell>
                            <TableCell>{marks.join(', ')}</TableCell>
                        </TableRow>
                ))}
                </TableBody>
                </Table>
            </Paper>
            <p>{message}</p>
        </div>
    )

}

export default GetAllMarks;