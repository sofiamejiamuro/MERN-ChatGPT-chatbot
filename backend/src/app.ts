import express from 'express';
import { config } from "dotenv";
config();
const app = express();
//middlewares
app.use(express.json());

export default app;

/**EXAMPLES
 * GET - PUT - POST - DELETE

app.get("/hello", (req,res,next) =>{
  console.log(req.body)
  return res.send("Hello");
});
//dynamic route
app.delete("/user/:id", (req,res,next) =>{
  console.log(req.params.id)
  return res.send("Hello");
});
 */