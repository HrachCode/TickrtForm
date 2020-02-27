const express = require('express')
const app = express()
const server = require('http').createServer(app);
const path = require('path')
const port = process.env.PORT || 5000
const cors = require('cors')
const morgan = require('morgan')
const nodemailer = require('nodemailer')


app.use(cors())
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// if (process.env.NODE_ENV === 'production') {
  const publicPath = path.join (__dirname, './','Upworking-master');
  app.use (express.static (publicPath));
  app.get ('*', (req, res) => { 
       
      res.sendFile (path.join (publicPath, 'index.html')); 
   })
//   }


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'formapi59@gmail.com',
      pass: 'virap100'
    }
  })

app.post('/mail',(req,res)=>{
    console.log(req.body.from)
    
    const mailOptions = {
        from: 'formapi59@gmail.com',
        to:'formapi59@gmail.com',
        subject: req.body.name,
        text: `ticket booking ${req.body.from}, ${req.body.to}, from ${req.body.value_from_start_date}  ${req.body.value_from_end_date}
        ticketClass  ${req.body.ticketClass}, Passengerscount ${req.body.Passengers},Passenger name  ${req.body.name},Passenger phone  ${req.body.phone}, Passenger email  ${req.body.email}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send(`<!DOCTYPE html>
          <html>
          <head>
              <title>succsses</title>
              <meta charset="utf-8" />
          </head>
          <body>
              <div>
              <h1 style="text-align: center;
              color: brown">Your application has been sent for processing</h1>
              <h2 style="text-align: center;
              color: #2a33a5">You will receive your email soon</h2>
              </div>
          </body>
          <html>`);
        }
       });
    
})






app.use((req,res,next)=>{
  const error = new Error('Note Found');
  error.status = 404;
  next(error)
})
app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    error:{
      message:error.message
    }
  })
})

server.listen(port, function () {
  console.log('Server is running on port: ' + port)
})