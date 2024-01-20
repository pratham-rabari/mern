import React, { useState } from 'react'
import '../style/Login.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()


  const post = async (e) => {

    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3500/login", {
        username, password, Credential: 'include'
      })
      console.log(res)
      localStorage.setItem("user", JSON.stringify(res.data))
      const token = res.data
      localStorage.setItem("token", token)
      alert("Logged In successfull")
      navigate('/')
    } catch (error) {
      alert("errorr")
    }
    setUsername("")
    setPassword("")
  }

  return (
    <div className='loginbox'>
      <div className="main">
        <div className="containerx b-container flex-column" id="b-container">
          <form className="form" id="b-form">
            <h2 className="form_title title">Log in to Website</h2>
            <div className="form__icons">
              <i className='bx bxl-facebook-circle'></i>
              <i className='bx bxl-instagram-alt' ></i>
              <i className='bx bxl-twitter' ></i>
            </div>
            <span className="form__span">or use your email account</span>
            <input className="form__input" type="text" placeholder="username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            <input className="form__input" type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </form>
              <button className="form__button button my-2" onClick={post}>Login</button>
              <span>Not Register In?<Link to="/Sign">register</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login
