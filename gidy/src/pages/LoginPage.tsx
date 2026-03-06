// import React from 'react'

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        name,
        email,
      });

      // Save user in localStorage (temporary auth)
     localStorage.setItem("user", JSON.stringify(response.data.user));
    

      navigate("/profile");

    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Invalid Name or Email");
      } else {
        setError("Something went wrong");
      }
    }
  };
  return (
//     <div className="login-page">
//       <div className="">
//             
//             <div className="text">
//                
       
//       
//       </div>
    
//     </div>

<div className="log">
  <div className="login-text">
    <div className="">
      <div className="login-head" style={{paddingTop:"10px"}}>
      <h2 style={{textAlign:"center" }}>Login</h2>
    </div>
    <div className="login-para" style={{marginTop:"10px"}}>
     <p style={{}}>
   Welcome to the <strong>Gidy AI Clone</strong>.  
   Please log in to explore the application and review the features implemented as part of this technical assessment. </p>
            
    </div>
    <div className="input-feilds" style={{marginTop:"10px" , display:"flex", flexDirection:"column"}}>
      <input
      style={{padding:"10px",borderRadius:"6px", }}
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="email"
        style={{padding:"10px",borderRadius:"6px", }}
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <button style={{padding:"10px", backgroundColor:"skyblue" , border:"none" ,borderRadius:"10px"}} onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    </div>
   
  </div>
</div>

  )
}

export default LoginPage