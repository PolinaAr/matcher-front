import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function CreateTeam() {
    const [team, setTeam] = useState('');
    const [message, setMessage] = useState('');
    const BASE_URL = global.config.BASE_URL;

    function handleAxiosPost() {
        const postData = {
            name: team,
          };
      
        axios.post(BASE_URL + '/teams', postData)
            .then((resp) => {
                setMessage("Saved")
            })
            .catch((error) => {
                setMessage(error.response.data.message)
            });
      }
    return(
        <div>
            <TextField
                    sx={{ m: 3, width: 200 }}
                    label="Enter team name"
                    variant="outlined"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    /> <br/>
            <Button variant="contained" color="primary" sx={{ mt: 2}} onClick={handleAxiosPost}>
                Save
            </Button>
            <p>{message}</p>
        </div>
    )
}

export default CreateTeam;