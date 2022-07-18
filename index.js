import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();

const server = express();

server.use(cookieParser())
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
    res.send('bem vindo ao servidor!')
  });
const corsOptions = cors({
  origin: ["http://localhost:5000","http://localhost:3000","http://localhost","http://127.0.0.1"],
  credentials: true,
  exposedHeaders: ["Set-Cookie"]
})


server.get('/setcookie',corsOptions , (req, res) => {
  res.cookie('bolacha','Valor da Bolacha',{});
  res.cookie('biscoito','Valor do Biscoito');
  console.log("salvar cookies")
  res.send('Cookie salvo!')
  
});

server.get('/getcookie', corsOptions,(req,res) =>{
  console.log(req.cookies)
  res.send(req.cookies);
});

server.get('/deletecookie',corsOptions, (req, res) => {
  //show the saved cookies
  res.clearCookie("biscoito")
  res.clearCookie("bolacha")
  res.send('Cookie has been deleted successfully');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server Online'));
