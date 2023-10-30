import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function GeneratePair() {
    const location = useLocation();
    const selectedUsers = location.state;
    const [userPairs, setUserPairs] = useState({ mainUser: null, opponentUser: null });
  
  const BASE_URL = global.config.BASE_URL;

  const handleGeneratePairs = () => {

    axios.post(BASE_URL + '/pairs/generate', selectedUsers)
    .then((response) => {
        const { mainUser, opponentUser } = response.data;
        setUserPairs({ mainUser, opponentUser });
      })
      .catch((error) => {
        console.error('Error generating pairs:', error);
      });
  };

  function handleAxiosPost() {
    const postData = {
        mainUser: {
          id: userPairs.mainUser.id,
          name: userPairs.mainUser.name,
          lastname: userPairs.mainUser.lastname,
          team: userPairs.mainUser.team,
        },
        opponentUser: {
          id: userPairs.opponentUser.id,
          name: userPairs.opponentUser.name,
          lastname: userPairs.opponentUser.lastname,
          team: userPairs.opponentUser.team,
        },
      };
  
    axios.post(BASE_URL + '/pairs/save', postData)
      .then((response) => {
        console.log("success")
      });
  }

  return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            {userPairs.mainUser ? (
                <div>
                <Typography sx={{ mt: 20, fontSize: 20 }}>
                    {userPairs.mainUser.name} {userPairs.mainUser.lastname} {userPairs.opponentUser.name} {userPairs.opponentUser.lastname}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2}} onClick={handleAxiosPost}>
                Save
                </Button>
                </div>
            ) : null}
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" 
        sx={{mt:20, fontSize:20}} onClick={handleGeneratePairs}>
          Generate Pair
        </Button>
      </Grid>
    </Grid>
  );
};

export default GeneratePair;
