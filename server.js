// Setup empty JS object to act as endpoint for all routes
const projectData = {};

/*Import all required node modules*/

// Require Express to run server and routes
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';

/* Set up instances and middleware */

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Create port
const PORT = 3000;
// Setup Server
app.listen(PORT,() => console.log(`Server running and listening on port: ${PORT}`))

/* Build routes */

// GET route
app.get('/weatherDevil', (req, res) => {
  res.send(projectData);
})


// POST route
app.post('/add', (req,res) => {
  projectData.date = req.body.date,
  projectData.city = req.body.city,
  projectData.temperature = req.body.temperature,
  projectData.content = req.body.feelings
  console.log(projectData);
  res.send('Post Received!');
});


