import React, { useEffect, useState } from 'react'
import Post from './Post'
import '../style/home.css'
import axios from 'axios'
import Detail from './Detail'
import { useSelector } from 'react-redux'

const Home = () => {
    const userf = JSON.parse(localStorage.getItem("user"))
    const id = useSelector((state) => state.UserSlice.value)


    const [user, setUser] = useState("")
    const [image, setImage] = useState()
    const [text, setText] = useState("")
    const[load,setLoad]=useState(false)
    const[present,setPresent]=useState()

    const current = async()=>{
        try{
        const curr = await axios.get("http://localhost:3500/alluser")
        const curuser = curr.data.filter((elem) => elem._id === userf._id)
         console.log(curuser)
         setPresent(curuser)
         console.log("p",present)
        }catch(error){
            console.log(error)
        }
       }

    useEffect(() => {
        current()
        setUser(userf ? userf._id: "")
    },[])
    const upload = async (e) => {
        if(!userf){
            alert ("please Login first")
        }
        e.preventDefault()
        console.log(user)
        const formdata = new FormData();
        formdata.append("image", image)
        formdata.append("text", text)
        formdata.append("user", user)
        setLoad(true)
        const result = await axios.post("http://localhost:3500/uppost", formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        setText("")
        setImage("")
        alert("submited")
    }

    const imageup = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }

    return (
        <div className="col-md-6 gedf-main box2 py-2">
            <div className="card gedf-card">
                <div className="card-body postx" id="postcard">
                    <div className="tab-content" id="myTabContent">
                        {userf?"":"Login to Create A Post"}
                        <div className="tab-pane fade show active d-flex" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                          {userf !== undefined?<div className="form-group">
                                <img src={`http://localhost:3500/uploads/${present?present[0].profileImage:""}`} className='imag mx-2' />
                            </div>:""}
                            <form onSubmit={upload} className='mx-3'>
                            <textarea className="form-control pt-4 rounded my-2 txt" id="message" rows="1" placeholder="Write Something..." value={text} onChange={(e) => { setText(e.target.value) }} name="text"></textarea>
                              <div className='d-flex postbox'>
                                <img src="https://cdn-icons-png.flaticon.com/128/739/739249.png" onClick={()=>document.querySelector('.input').click()} className='icon mx-1'/>
                                <span><strong>Image</strong></span>
                                <input type="file" hidden accept='image/*' name="image" placeholder='image' className='input' onChange={imageup}/>
                                <button type="submit" className="btn btn-primary mx-3 rounded btnx">Post</button>
                               </div>
                    
                            </form>
                        </div>
                        <div className="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
                            <div className="form-group">
                            </div>
                            <div className="py-4"></div>
                        </div>
                    </div>

                    <a href="#" className="card-link"><i className="fa fa-paperclip mr-3"></i></a>
                    <a href="#" className="card-link"><i className="fa fa-map-marker mr-3"></i></a>
                    <a href="#" className="card-link"><i className="fa fa-mail-forward mr-3"></i></a>
                    <div className="btn-group mt-4">
                    </div>

                </div>

            </div>
            <div className='my-2'>
               {id? <Detail/>:<Post upload={upload} present={present}/>}

            </div>
        </div>
    )
}

export default Home
