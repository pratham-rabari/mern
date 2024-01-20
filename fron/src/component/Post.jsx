import React, { useState, useEffect } from 'react'
import '../style/post.css'
import axios from 'axios'
import PropTypes from 'prop-types';



const Post = (props) => {

    const userf = JSON.parse(localStorage.getItem("user"))

    const[allpost,setAllpost]=useState([])
    const[show,setShow]=useState(false)
    const[comn,setComn]=useState("")
    const fetch = async () => {
        try{
        const res = await axios.get("http://localhost:3500/allpost")
       setAllpost(res.data.reverse())
    //    console.log("res",res)
        }catch(error){
            console.log(error)
        }
        
}
        const like = async(post)=>{     
            if(!userf){
                return alert("please login first")
            }
            console.log(userf)
          const res = await axios.post("http://localhost:3500/like",{
                post,userf
          })
           }

    useEffect(() => {
        fetch()    
    },[props.upload,like])

  
    const PostComment = async(post)=>{
        try{
       const res = await axios.post("http://localhost:3500/Comment",{
        post,userf,comn
       })
       alert("commented")
    }catch(error){
        console.log(error)
    }
    }
    
const check = (elem)=>{
if(elem.Comments.length>=0){
   return setShow(true)
}
// else{
//     return alert("no comment on this post Yet")
// }
}

const delepost = async(id)=>{
    try{
await axios.delete(`http://localhost:3500/delete/${id}`)
    }catch(error){
        console.log(error)
    }
alert("post deleted")
// location.reload()
}
    return (
     
        <div className='postbox'>
            <div className="bg-cont"></div>
          {allpost.map((elem)=>{
           return(
            <>
           <div className="card-border p-3" key={elem._id}>
           {userf?<div className='set' onClick={()=>delepost(elem._id)}>
           {userf._id === elem.user._id?<span><img src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" className='icon2'/></span>:""}
           </div>:""}
            <div className="d-flex flex-row postbox2">
                <div className=''>
                <img src={`http://localhost:3500/uploads/${elem.user.profileImage}`} className="profile-pic imag" />
                </div>
                <div>
                    <h5><strong><span className="span-profile-name mx-1">{elem.user.username}</span></strong></h5>
                    <div className='mt-4 mx-2'>
                    <h6 className="tweet-text mt-2 my-1">{elem?elem.caption:""}</h6>
                    <div className='xv'>
                    <img src={`http://localhost:3500/uploads/${elem.picture}`} className='postimag'/>
                    </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row ml-4 my-2">
            <div className="d-flex flex-row m-auto" onClick={()=>{like(elem)}}>
                    <i className="far fa-heart icon mr-2"><img src={elem?elem.likes.indexOf(userf?userf._id:"") !== -1?"https://t4.ftcdn.net/jpg/04/87/30/67/240_F_487306752_kIP0e8EbW8JOcs1rCL2oxTiovXLXELNR.jpg":"https://cdn-icons-png.flaticon.com/128/1077/1077035.png":""} className='icon' /></i>
                    <p>{elem.likes.length}</p>
                </div>
                <div className="d-flex flex-row m-auto" onClick={()=>{check(elem)}}>
                    <i className="far fa-comment icons mr-2"><img src='https://cdn-icons-png.flaticon.com/128/1370/1370907.png' className='icon' /></i>
                    <p>{elem.Comments?elem.Comments.length:0}</p>
                </div>
                <div className="m-auto">
                    <i className="fas fa-upload icons mr-2"></i>
                </div>
            </div>
        </div><hr/>
        {/* comment section */}
       {show?<div className='cbox'>
            <button className='btn btn-danger' onClick={()=>{setShow(false)}}>x</button>
        {elem.Comments.length>0?elem.Comments.map((com)=>{
           return( <div className=' mx-2' key={elem._id}>
            <div className='d-flex my-2'>
               <img src={`http://localhost:3500/uploads/${com.user.profileImage}`} className='cpic mx-1'/>
               <h6>{com.user.username}</h6>
               </div>
               <div>
               <h5 className='mx-3'>{com.text}</h5>
               </div><hr/>
          </div>
           )
        }):<h2>No Comments</h2>
        }
          <div className='d-flex text-center' style={{position:"relative"}}>
          <input type="text" className='in' value={comn} onChange={(e)=>{setComn(e.target.value)}}/>
          <button className='btn btn-primary mx-2' onClick={()=>{PostComment(elem)}}>Post</button>
          </div>
        </div>:""}
        </> 
           )
          })
}
        </div>
       
    )
}

Post.propTypes = {
    upload: PropTypes.func.isRequired, // Ensure onClick is a required function prop
  };
  
export default Post
