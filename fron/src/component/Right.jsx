import React, { useState, useEffect } from 'react'
import '../style/right.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getUser } from '../Slices/UserSlice'
import { useSelector,useDispatch } from 'react-redux'

const Right = () => {
    const Userx = !!localStorage.getItem("token")
    const geth = JSON.parse(localStorage.getItem("user"))
    const [alluser, setAlluser] = useState([])
    const[fill,setFill]=useState([])
    const[search,setSearch]=useState("")
    const dispatch = useDispatch()

    const logout = () => {
        location.reload()
        localStorage.removeItem("token")
         localStorage.removeItem("user")
        alert("you are Logout")
    }

    const getUsers = async () => {
        try{
        const allusers = await axios.get("http://localhost:3500/alluser")
       const rx = geth?allusers.data.filter((x) => x._id !== geth._id):""
        geth?setAlluser(rx):""
        }catch(error){
            console.log(error)
        }
    }

    const UserDetail = (item)=>{
     console.log(item)
     dispatch(getUser(item._id))
    }

    const item = alluser.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()))    

    useEffect(()=>{
     setFill(item)
    },[search])

    useEffect(() => {
        getUsers()
    }, [])
    return (
        <>
        <div className='col-md-3 box3'>
            {Userx ? <button className='btn btn-danger' onClick={logout}>Logout</button> :
                <Link to="/Login"><button className='btn btn-primary'>Login</button></Link>
            }
            <h2>Freinds Suggestion</h2>
            {Userx?"":"Please login first to get Friends Suggestion"}
            <input placeholder='Search' value={search} onChange={(e)=>{setSearch(e.target.value)}} className='inp mx-2'/>
            <hr />
          {search?<><div>
                {fill.map((item) => {                 
                      return <div className='d-flex' key={item._id} onClick={()=>{UserDetail(item)}} style={{cursor:"pointer"}}>
                        <img src={`http://localhost:3500/uploads/${item?item.profileImage:""}`} className='imagp' />
                        <div className='mx-3'>
                            <h5>{item?item.username:""}</h5>
                            <p>{item?item.name:""}</p>
                        </div>
                  </div>                  
                })}      
            </div>
                        </>:<div>
                {alluser.map((item) => {                 
                      return <div className='d-flex' key={item._id} onClick={()=>{UserDetail(item)}} style={{cursor:"pointer"}}>
                        <img src={`http://localhost:3500/uploads/${item?item.profileImage:""}`} className='imagp' />
                        <div className='mx-3'>
                            <h5>{item?item.username:""}</h5>
                            <p>{item?item.name:""}</p>
                        </div>

                  </div>                  
                })}      
            </div>
            }

            </div>
        </>
    )
}

export default Right
