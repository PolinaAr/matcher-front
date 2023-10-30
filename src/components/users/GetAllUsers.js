import axios from "axios";
import React, { useEffect, useState } from "react";

function GetAllUsers() {
    const[data, setData] = useState([]);
    const BASE_URL = global.config.BASE_URL;

    useEffect(() => {
        axios.get(BASE_URL + '/users')
        .then(resp => {
            setData(resp.data);
        });
    }, []);

    function deleteHandle(e, id) {
        console.log(data.id)
        axios.delete(BASE_URL + '/users/' + id)
        .then(resp => {
            window.location.reload()
            }
        )
    }

    return(
        <div>
            <h1>All users</h1>
            {data.map(item => (
                <p key={item.id}>
                    {item.id} {item.name} {item.lastname} {item.team}
                    <button onClick={(e) => deleteHandle(e, item.id)}>Delete</button>
                </p>
            ))}
    </div>
    );
}

export default GetAllUsers;