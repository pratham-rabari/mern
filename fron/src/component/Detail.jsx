import React, { useState,useEffect} from 'react'
import '../style/post.css'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Detail = () => {
     const[uid,setUid]=useState("")
     const userf = JSON.parse(localStorage.getItem("user"))
    const[likeo,setLikeo]=useState(false)
     const[detail,setDetail]=useState()
     const[x,setX]=useState(false)
     const[show,setShow]=useState(false)
     const[comn,setComn]=useState("")



    const id = useSelector((state) => state.UserSlice.value)

    const like = async(post)=>{     
        if(!userf){
            return alert("please login first")
        }
      const res = await axios.post("http://localhost:3500/like",{
            post,userf
      })
       setLikeo(true)
     setX(true)
       }

    const fetch = async()=>{
         setUid(id)
         const res = await axios.get(`http://localhost:3500/UserDetail/${id}`)
         setDetail(res.data)
         setX(false)
    }
    const PostComment = async(post)=>{
      try{
     const res = await axios.post("http://localhost:3500/Comment",{
      post,userf,comn
     })
     setComn("")
      !!fetch()
  }catch(error){
      console.log(error)
  }
  
  }

    useEffect(()=>{
        fetch()
    },[id,detail])

    
    const check = (elem)=>{
      if(elem.Comments.length>=0){
         return setShow(true)
      }
      // else{
      //     return alert("no comment on this post Yet")
      // }
      }

      
  return (
    <div className='postbox'>
        <button className='btn btn-primary' onClick={()=>{location.reload()}}>Back</button>
    <div className="bg-cont"></div>

  
      <div className="card-border p-3">
      <div className="d-flex flex-row">
          <div className='mx-2'>
          <img src={`http://localhost:3500/uploads/${detail?detail.profileImage:""}`} className="profile-pic imag mr-3" />
          </div>
          <div>
              <h5><strong><span className="span-profile-name">{detail?detail.username:""}</span></strong></h5>
            {detail && detail.posts.map((elem)=>{
             return ( 
                <>
             <div className='mt-4' key={elem._id}>
                <h6 className="tweet-text mt-2 my-2">{elem?elem.caption:""}</h6>
                <img src={`http://localhost:3500/uploads/${elem?elem.picture:""}`} className='postimag'/>
                </div>
                 <div className="d-flex flex-row ml-4 my-2">
                 <div className="d-flex flex-row m-auto" onClick={()=>{like(elem)}}>
                    <i className="far fa-heart icon mr-2"><img src={elem?elem.likes.indexOf(userf?userf._id:"") !== -1?"https://t4.ftcdn.net/jpg/04/87/30/67/240_F_487306752_kIP0e8EbW8JOcs1rCL2oxTiovXLXELNR.jpg":"https://cdn-icons-png.flaticon.com/128/1077/1077035.png":""} className='icon' /></i>
                    <p>{elem.likes.length}</p>
                </div>
                          <div className="d-flex flex-row m-auto" onClick={()=>{check(elem)}}>
                              <i className="far fa-comment icons mr-2"><img src='https://cdn-icons-png.flaticon.com/128/1370/1370907.png' className='icon' /></i>
                              <p>{elem.Comments?elem.Comments.length:""}</p>
                            </div>
                            
                      </div>
                  {show?<div>
                        {/* comments */}
                        <button className='btn btn-danger' onClick={()=>{setShow(false)}}>X</button>
             {elem.Comments?elem.Comments.map((com)=>{
           return( <div className=' mx-2' key={elem.Comments._id}>
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
        }                     <div className='d-flex text-center' style={{position:"relative"}}>
        <input type="text" className='in' value={comn} onChange={(e)=>{setComn(e.target.value)}}/>
        <button className='btn btn-primary mx-2' onClick={()=>{PostComment(elem)}}>Post</button>
        </div>
      </div>
                  :""}
                      </>
             )
            })}
          </div>
      </div>

  </div>
  
</div>
  )
}

export default Detail
