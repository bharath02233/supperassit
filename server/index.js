var express=require("express")
var mongoose=require("mongoose");
var quizMod=require("./models/quiz")
var quiz1Mod=require("./models/quiz1")
var bodyparser=require('body-parser'); 
var cors=require('cors');

var app=express();
mongoose.connect('mongodb+srv://bharath02233:Bharath-123@cluster0.ipbyk.mongodb.net/quiz',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const allowedOrigins = [
 "https://supperassit-client.vercel.app",
 "https://supperassit-client.vercel.app/createQuiz",
];


app.use(cors({
  origin: (origin, callback) => {
    // Check if the request's origin matches any of the allowed origins
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Allow the request from the origin
      callback(null, true);
    } else {
      // Reject the request if origin is not allowed
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allow specific HTTP methods
  credentials: true,  // Allow credentials (cookies, etc.)
}));



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:'false'}));
console.log('hi')
app.get("/",(req,res)=>{res.send("welcome to server")})
app.post("/submit",(req,res)=>{
    console.log(req.body)
    quizMod.insertMany(req.body)
  .then(() => {
    console.log('Data inserted successfully');
    // Close the connection after operation
  })
  .catch(err => console.error('Error inserting data', err));
    const response = { message: 'hi' };  // Create a response object
    res.json(response);
    
})

app.post("/submit1",(req,res)=>{
    const temp=new quiz1Mod(req.body);
    temp.save().then((data)=>{console.log(data)}).catch((error)=>{console.log(error)})

      const response = { message: 'hi' };  // Create a response object
      res.json(response);
   
    
})

app.get("/quiz",(req,res)=>{
   quizMod.find().then((data)=>{
     res.json(data);
   })
})

app.get("/quiz1",(req,res)=>{
  quiz1Mod.find().then((data)=>{
    res.json(data);
  })
})

app.listen("4300",()=>{console.log('server running sucessfully')});
