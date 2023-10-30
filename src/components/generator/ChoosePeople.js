import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChoosePeople() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = global.config.BASE_URL;

  useEffect(() => {
    axios.get(BASE_URL + '/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUserSelection = (user) => {
    const isSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);

    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleNextPage = () => {
    navigate('/pairs', { state: selectedUsers });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Select Users for Pairing</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormGroup>
            {users.map((user) => (
              <FormControlLabel
                key={user.id}
                control={
                  <Checkbox
                    checked={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
                    onChange={() => handleUserSelection(user)}
                  />
                }
                label={`${user.name} ${user.lastname} (${user.team})`}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleNextPage} disabled={selectedUsers.length === 0}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChoosePeople;
