const express = require("express")
const usermodel = require("./models/user")
const cors = require("cors")
const bodyParser = require("body-parser")
const expressSession = require("express-session")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const upload = require("./multer")
const postmodel = require("./models/post")
const path = require("path")
const commentmodel = require("./models/Comments")

const SECRET_KEY="secretkey"


const app = express()
app.use(cors())
app.use('/uploads',express.static('uploads'))

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))



app.get("/",(req,res)=>{
res.send("helloo")
})


app.post("/register",upload.single("image"),async(req,res)=>{
  try{
    const{username,email,password,name}=req.body
    const hashedPassword =await bcrypt.hash(password,10)
    const newUser = new usermodel({username,email,name,password:hashedPassword})
    await newUser.save()
    res.status(201).send(newUser)
        }catch(error){
            res.status(500).json({error:error})
        }
  })

  app.post("/login",async(req,res)=>{
    try{
    const{username,password}=req.body
    const user =await usermodel.findOne({username})
    if(!user){
        return res.status(401).json({error:"inavalid detail"})
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(401)
    }
    const token = jwt.sign({userId:user._id},SECRET_KEY,{expiresIn:'24hr'})
   return res.status(201).send((token,user))
  
    }catch(error){
    res.status(500).json({error:"error in login"})
    }
})

app.post("/uppost",upload.single("image"),async(req,res)=>{
    try{
    const user = await usermodel.findById(req.body.user)
    const post = await postmodel.create({
        caption:req.body.text,
        picture:req.file.filename,
        user:user._id,
      })
      user.posts.push(post._id)
      await user.save()
    }catch(error){
    console.log(error)
    }


})

app.get('/allpost', async function(req, res) {
    const posts = await postmodel.find().populate("user").populate({path:"Comments",populate:{path:"user"}})
      res.send(posts)
    });
  
app.post('/edit',upload.single('image'),async(req,res)=>{
    try{
     const user = await usermodel.findByIdAndUpdate({_id:req.body.user},{username:req.body.username,name:req.body.name},{new:true})
     if(req.file){
        user.profileImage=req.file.filename;
     }
     await user.save();
     console.log(user)
     res.send(user)
    }catch(error){
       console.log(error)
    }
})
  
app.get("/alluser",async(req,res)=>{
const users = await usermodel.find()
res.send(users)
})

app.post("/like",async(req,res)=>{
  const user = await usermodel.findOne({_id:req.body.userf._id})
  const post = await postmodel.findOne({_id:req.body.post._id})

  if(post.likes.indexOf(user._id)===-1){
    post.likes.push(user._id);
  }
  else{
    post.likes.splice(post.likes.indexOf(user._id),1);
  }
  await post.save()
  console.log(user)
})

app.get("/UserDetail/:id",async(req,res)=>{
//  const user = await usermodel.findById(req.params.id).populate("posts").populate({path:"Comments",populate:{path:"user"}})
const user = await usermodel.findById(req.params.id).populate({path:"posts",populate:{path:"Comments",populate:{path:"user"}}})

 res.send(user)
})

app.post("/Comment",async(req,res)=>{
const currentu = req.body.userf
const post = await postmodel.findById(req.body.post._id)
const text = req.body.comn;

const comment = await commentmodel.create({
  user:currentu._id,
  post:post._id,
  text:text,
})

post.Comments.push(comment._id)
await comment.save()
await post.save()
})

app.get("/comuser/:id",async(req,res)=>{
const users = await usermodel.findById(req.params.id)
})

app.delete("/delete/:id",async(req,res)=>{
  try{
 const post =await postmodel.findByIdAndDelete(req.params.id)
 console.log(post)
const user=  await usermodel.findByIdAndUpdate(post.user, { $pull: { posts: post._id } });
console.log(user)

  }catch(error){
    console.log(error)
  }
})

app.listen("3500",()=>{
    console.log("server 3500")
})




