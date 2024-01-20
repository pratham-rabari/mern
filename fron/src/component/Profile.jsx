import React, { useState, useEffect } from 'react'
import '../style/Login.css'
import axios from 'axios'


const Profile = (props) => {
  const userf = JSON.parse(localStorage.getItem("user"))
  console.log(props.present)
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [image, setImage] = useState()
  const [userx, setUserx] = useState("")

  console.log("image", image)
  useEffect(() => {
    setUserx(userf._id)
    // setUserx(props.present.username)
    console.log(userx)
  }, [])

  const post = async (e) => {
    e.preventDefault()
    if(username === ""){
      return alert("please fill detail")
    }
    const formdata = new FormData();
    formdata.append("image", image)
    formdata.append("name", name)
    formdata.append("username", username)
    formdata.append("user", userx)

    const result = await axios.post("http://localhost:3500/edit", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    console.log(image)
    setImage("")
    console.log("res", result)
    alert("submited")
    location.reload()
  }
  return (
    <div className='editbox'>
      <div>
        <button className='btn btn-danger mx-2 my-2' onClick={() => { props.setShow(false) }}>X</button>
        <form className="form" id="b-form" onSubmit={post}>
          {/* <div className='text-center'> */}
          <img src={`http://localhost:3500/uploads/${props.present[0].profileImage}`} className='pro' /><br />
          <div className='d-flex postbox' onClick={() => document.querySelector('.input').click()}>
            <img src="https://cdn-icons-png.flaticon.com/128/739/739249.png" className='icon mx-1' />
            <span><strong>Image</strong></span>
            <input type="file" hidden accept='image/*' name="image" placeholder='image' className="input" onChange={(e) => { setImage(e.target.files[0]) }} /><br />
          </div>
          <p>profile pic</p>
          {/* </div> */}
          <input className="form__input" type="text" placeholder="username" name="username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
          <input className="form__input" type="text" placeholder="name" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
          <button className="form__button button text-center" type="submit">Edit</button>
        </form>
      </div>
    </div>
  )
}

export default Profile
