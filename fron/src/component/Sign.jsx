import { useState } from 'react'
import '../style/Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'


const Sign = () => {
const[username,setUsername]=useState("")
const[email,setEmail]=useState("")
const[name,setName]=useState("")
const[password,setPassword]=useState("")
const navigate = useNavigate()

const post = async(e)=>{
  e.preventDefault()
  
  const res = await axios.post("http://localhost:3500/register",{
    username,email,password,name
  })
  alert("registration successfull")
  setUsername("")
setPassword("")
setEmail("")

navigate('/Login')
}
  return (
    <div className='loginbox'>
        <div className="main">
      <div className="container b-container" id="b-container">
        <form className="form" id="b-form" onSubmit={post}>
          <h2 className="form_title title">Sign in to Website</h2>
          {/* <div className='text-center'>
            <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" className='pro'/><br/>
            <input type="file" accept='image/*' name="image" placeholder='image' onChange={(e)=>{setImage(e.target.value)}}/><br/>
            <p>profile pic</p>
          </div> */}
          <input className="form__input" type="text" placeholder="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
          <input className="form__input" type="text" placeholder="name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
          <input className="form__input" type="email" placeholder="Email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input className="form__input" type="password" placeholder="Password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          
        </form>
        <div className='text-center my-4'>
        <button className="form__button button my-2" onClick={post}>Login</button><br/>
        <span>Alredy Signed In?<Link to="/Login">Login</Link></span>
        </div>

      </div>
      </div>
    </div>
  )
}

export default Sign
