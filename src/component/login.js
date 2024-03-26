// Import the react JS packages 
import axios from "axios";

import {useState} from "react";// Define the Login function.

export const Login = () => {
    const [username, setUsername] = useState('');     
    const [password, setPassword] = useState('');

    // Create the submit method.
    const submit = async e => {         
        e.preventDefault();          
        const user = {
            username: username,
            password: password
        }
    
    

        // // Create the POST requuest
        const {data} = await axios.post('http://localhost:8000/token/', user, 
                                {
                                    headers: {'Content-Type': 'application/json'}
                                },
                                { 
                                    withCredentials: true
                                }
        );

        // var axios = require('axios');
        // var data = JSON.stringify({
        // "username": username,
        // "password": password
        // });

        // var config = {
        // method: 'post',
        // url: 'http://127.0.0.1:8000/token/',
        // headers: { 
        //     'Content-Type': 'application/json'
        // },
        // data : data
        // };

        // axios(config)
        // .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // })
        // .catch(function (error) {
        // console.log(error);
        // });


    
        // Initialize the access & refresh token in localstorage.  
        console.log(data.access);
        console.log( data.refresh);  
        localStorage.clear();         
        localStorage.setItem('access_token', data.access);         
        localStorage.setItem('refresh_token', data.refresh);         
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;         
        window.location.href = '/'    
    }

    return(
        <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input className="form-control mt-1" 
                placeholder="Enter Username" 
                name='username'  
                type='text' value={username}
                required 
                onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input name='password' 
                type="password"     
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" 
                 className="btn btn-primary">Submit</button>
            </div>
          </div>
       </form>
     </div>

    )
}

