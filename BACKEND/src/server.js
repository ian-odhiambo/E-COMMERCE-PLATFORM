import express from "express" ;
import dotenv from "dotenv";

dotenv.config();

const app = express();
console.log(process.env.PORT)

app.listen(5000, ()=> {
    console.log("server is running on PORT 5000")
})