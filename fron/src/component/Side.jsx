import React,{useEffect, useState} from 'react'
import '../style/side.css'
import Profile from './Profile'
import axios from 'axios'

const Side = () => {
    // const[user,setUser]=use
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    const[show,setShow]=useState(false)
    const[present,setPresent]=useState()
    
    const current = async()=>{
        try{
     const curr = await axios.get("http://localhost:3500/alluser")

     const curuser = curr.data.filter((elem) => elem._id === user._id)
      console.log(curuser)
      setPresent(curuser)
      console.log("p",present)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
      current()
    },[])
    return (
        <div className='col-md-2 box1'>
            <div className='d-flex flex-column my-3 mx-2'>
            {user?<div className='d-flex'>
                    <img src={`http://localhost:3500/uploads/${present?present[0].profileImage:""}`} className='imag' />
                    <div className='mx-3'>
                        <h5>{present?present[0].username:""}</h5>
                        <p>{present?present[0].name:""}</p>
                    </div>
                </div>:""}
                {user?<button className='btn btn-primary' onClick={()=>{setShow(true)}}>Edit Profile</button>:""}

                {/* profile */}
                 {show?<Profile show={show} setShow={setShow} present={present}/>:""}
                {/* end */}
                <hr />
                <div className='py-1 add'>
                    <span><img src="https://cdn-icons-png.flaticon.com/128/2838/2838912.png" className='iconx '/>Add Your Location</span>
                    <span><img src="https://cdn-icons-png.flaticon.com/128/5859/5859080.png" className='iconx my-3'/> Add Your Profession</span>
                </div>
                <hr/>
                <div className='add'>
                <span><img src="https://cdn-icons-png.flaticon.com/128/1384/1384031.png" className='iconx my-1'/> Instagram</span><br/>
                <span><img src="https://cdn-icons-png.flaticon.com/128/11823/11823292.png" className='iconx my-2'/>Twitter</span><br/>
                <span><img src="https://cdn-icons-png.flaticon.com/128/2175/2175193.png" className='iconx my-2'/>Facebook</span>
                </div>
            </div>
        </div>
    )
}

export default Side
