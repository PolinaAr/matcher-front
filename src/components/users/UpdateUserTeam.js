import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUserTeam(){
    const { id } = useParams();
    const BASE_URL = global.config.BASE_URL;
    const [message, setMessage] = useState('');
    let navigate = useNavigate();

    const [data, setData] = useState({
        id: "",
        name : "",
        lastname : "",
        email : "",

    })

    useEffect(() => {
        axios.get(BASE_URL + `/users/${id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                setMessage(error.response.data.message)
            });
    },[id]);

    function handle(e){
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }

    function submit(e){
        e.preventDefault();
        axios.put(BASE_URL + `/users/${id}`, {
            id: data.id,
            name: data.name,
            lastname: data.lastname,
            team: data.team
        }).then(res=>{
                console.log(res.data)
                navigate('/users')
            })
            .catch(error =>{
                setMessage(error.response.data.message)
            })
    }

    return (
        <div>
            <p>{data.name} {data.lastname}</p>
            <form onSubmit={(e) =>submit(e)}>
                <input onChange={(e) =>handle(e)} id={'team'} value={data.team} type={"text"} placeholder={'team'}/>
                <button>Submit</button>
                <p>{message}</p>
            </form>
        </div>
    );
}

export default UpdateUserTeam;