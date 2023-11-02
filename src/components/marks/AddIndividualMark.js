import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddIndividualMark(){
    const BASE_URL = global.config.BASE_URL;
    let navidate = useNavigate();
    const {id} = useParams();
    const [message, setMessage] = useState("");

    const [mark, setMark] = useState({
        date:"",
        mark:''
    })

    function handle(e){
        const newMark = {...mark}
        newMark[e.target.id] = e.target.value
        setMark(newMark)
        console.log(newMark)
    }

    function submit(e){
        e.preventDefault();
        axios.post(BASE_URL + `/users/${id}/individualMark`, {
            date: mark.date,
            mark: mark.mark
        }).then(res => {
            navidate("/users")
        }).catch(error => {
            setMessage(error.response.data.message)
        })
    }

    return(
        <div>
            <form onSubmit={(e) => submit(e)}>
                <input onChange={(e) => handle(e)} id={'date'} value={mark.date} type={"date"} placeholder={'date'}/>                
                <input onChange={(e) => handle(e)} id={'mark'} value={mark.mark} type={"number"} step={0.5} placeholder={'mark'}/>
                <button>Submit</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default AddIndividualMark;