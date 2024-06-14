import express from 'express';

const app = express();
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

//middlewares
app.use(express.json());

//connections and listeneres
app.listen(3000, () => console.log("Server Open"))