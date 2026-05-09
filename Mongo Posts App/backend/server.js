import express from "express";
import cors from 'cors'
import corsOptions from "./config/corsPolicy.js";
import postRouter from "./routes/posts.js";
import connectDb from "./config/db.js";
import dotenv from 'dotenv'

dotenv.config(); // !what does this line do?
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));

app.use('/api/post', postRouter);

connectDb();    // * connect to mongodb database

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})
