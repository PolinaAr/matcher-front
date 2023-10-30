import React, { useState } from 'react';
import { Button, Grid, Typography, TextField } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function GeneratePair() {
    const location = useLocation();
    const selectedUsers = location.state;
    const [userPairs, setUserPairs] = useState({ mainUser: null, opponentUser: null });
    const [mainUserMark, setMainUserMark] = useState('');
    const [opponentUserMark, setOpponentUserMark] = useState('');
    const [messageOnGenerate, setMessageOnGenerate] = useState('');
    const [messageOnSave, setMessageOnSave] = useState('');
  
  const BASE_URL = global.config.BASE_URL;

  const handleGeneratePairs = () => {

    axios.post(BASE_URL + '/pairs/generate', selectedUsers)
    .then((response) => {
        const { mainUser, opponentUser } = response.data;
        setUserPairs({ mainUser, opponentUser });
      })
      .catch((error) => {
          console.log(error);
        setMessageOnGenerate(error.response.data.message)
      });
      setMainUserMark('');
      setOpponentUserMark('');
      setMessageOnSave('');
  };

  function handleAxiosPost() {
    const postData = {
        mainUser: {
          id: userPairs.mainUser.id,
          mark: parseFloat(mainUserMark),
        },
        opponentUser: {
          id: userPairs.opponentUser.id,
          mark: parseFloat(opponentUserMark),
        },
      };
  
    axios.post(BASE_URL + '/pairs/save', postData)
        .then((resp) => {
            setMessageOnSave("Saved")
        })
        .catch((error) => {
            setMessageOnSave(error.response.data.message)
        });
  }

  return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            {userPairs.mainUser ? (
                <div>
                <Typography sx={{ mt: 20, fontSize: 20 }}>
                    {userPairs.mainUser.name} {userPairs.mainUser.lastname} / {userPairs.opponentUser.name} {userPairs.opponentUser.lastname}
                </Typography>
                <TextField
                sx={{ m: 3, width: 150 }}
                label={userPairs.mainUser.name}
                variant="outlined"
                value={mainUserMark}
                onChange={(e) => setMainUserMark(e.target.value)}
                />
                <TextField
                sx={{ m: 3, width: 150 }}
                label={userPairs.opponentUser.name}
                variant="outlined"
                value={opponentUserMark}
                onChange={(e) => setOpponentUserMark(e.target.value)}
                /> <br/>
                <Button variant="contained" color="primary" sx={{ mt: 2}} onClick={handleAxiosPost}>
                Save
                </Button>
                <p>{messageOnSave}</p>
                </div>
            ) : null}
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" 
        sx={{mt:15, fontSize:20}} onClick={handleGeneratePairs}>
          Generate Pair
        </Button>
        <p>{messageOnGenerate}</p>
      </Grid>
    </Grid>
  );
};

export default GeneratePair;
