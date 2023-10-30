import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../config.js';


function CreateUser() {

    const BASE_URL = global.config.BASE_URL;
    let navidate = useNavigate()

    const [user, setUser] = useState({
        name : "",
        lastname : "",
        team : ""
    })
    const [message, setMessage] = useState()

    function handle(e){
        const newUser = {...user}
        newUser[e.target.id] = e.target.value
        setUser(newUser)
        console.log(newUser)
    }

    function submit(e){
        e.preventDefault();
        console.log(user)
        axios.post(BASE_URL + "/users", {
            name: user.name,
            lastname: user.lastname,
            team: user.team
        }).then(res => {
            console.log(res.user)
            navidate("/users")
        }).catch(error => {
            setMessage(error.response.data.message)
        })
    }

    return(
        <div>
            <form onSubmit={(e) => submit(e)}>
                <input onChange={(e) => handle(e)} id={'name'} value={user.name} type={"text"} placeholder={'name'}/>                
                <input onChange={(e) => handle(e)} id={'lastname'} value={user.lastname} type={"text"} placeholder={'lastname'}/>
                <input onChange={(e) => handle(e)} id={'team'} value={user.team} type={"text"} placeholder={'team'}/>
                <button>Submit</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default CreateUser;