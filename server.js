const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/'))


//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");


// app.get("/", function (request, response) {
//   response.send("Hotel booking server.  Ask for /bookings, etc.");
// });

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/booking.html');
});

app.post("/bookings", function (req, res) {
  let newBooking ={id: bookings.length +1 , ...req.body} ;

  //check if all the fileds are completed
  let check = Object.values(newBooking).indexOf('');
  
  if(check == -1){
    bookings.push(newBooking)
    res.send("Booking added successfully")
  }else{
    res.sendStatus(400)
  }
  
});

app.get("/bookings", function (req, res) {
  res.send(bookings)
});

app.get("/bookings/:id", function (req, res) {

  let id = req.params.id;
  
  let filteredBooking = bookings.filter(booking => booking.id == id) 

  filteredBooking.length == 1 ? res.send(filteredBooking) : res.sendStatus(404);
  
});

app.delete("/bookings/:id", function (req, res) {

  let id = req.params.id;
  const index = bookings.findIndex(item => id == item.id );
  if(index >= 0){
    bookings.splice(index, 1);
    res.send('Booking deleted successfully')
  }else{
    res.sendStatus(404);
  }
  
});

// TODO add your routes and helper functions here

const listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
