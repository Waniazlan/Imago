const express = require('express');
const createError = require('http-errors');
require('dotenv').config();
const app = express();
const cors = require('cors');
const {google} = require('googleapis');

app.use(express.json());
app.use(express.urlencoded({extended:false}));


const GOGGLE_CLIENT_ID = '21633126117-m0adi0dqmienhgrd9eierabhklpoi1b3.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
const REFRESH_TOKEN = '1//0gNz4BVB4bVcwCgYIARAAGBASNwF-L9IrNvrqKKomtjlBQXs8I-Z5p2SCpPJigvM__l3rw7iOLh5gKnzuw-ErsGcPgQzppE-DHFU'

const oauth2Client = new google.auth.OAuth2(
    GOGGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'http://localhost:5173',
   
)
app.use(cors({ origin: 'http://localhost:5173',
  methods:['GET', 'POST','DELETE']
 }));

 

app.get('/',async(req,res,next) =>{
  res.send({message:'awesome'})
})

app.post('/create-token', async (req, res) => {
 const {code} = req.body;
 const {tokens} = await oauth2Client.getToken(code)
 console.log(tokens)
})
app.post('/create-event', async (req, res,next) => {
  try {
      const {summary,startDateTime,endDateTime} = req.body;
      oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN},)
      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
      const response = await calendar.events.insert({
        calendarId:'primary',
        requestBody:{
          start:{
            dateTime: new Date(startDateTime)
        },
        end:{
            dateTime: new Date(endDateTime)
        },
        summary:summary 
        }
      })
      res.send(response.data)
    } catch (error) {
      next(error)
    }
});

app.get('/events', async (req, res) => {
  try {

    const { token } = req.query;     
    const {tokens} = await oauth2Client.getToken(token) 
    oauth2Client.setCredentials(tokens);
    const calendar = google.calendar({version: 'v3', auth:oauth2Client});
    const response = await calendar.events.list({
      calendarId: 'primary', 
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = response.data.items;
    res.json({events})
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ error: 'Error retrieving events' });
  }
});


app.delete('/events/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const calendar = google.calendar({version: 'v3', auth:oauth2Client});
    await calendar.events.delete({ calendarId: 'primary', eventId });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Error deleting event' });
  }
});

app.put('/events/:eventId',async(req,res) =>{
  try {
    const {eventId} = req.params
    const {summary,startDateTime,endDateTime} = req.body
    const calendar = google.calendar({version:'v3',auth:oauth2Client});
    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId: eventId,
      requestBody: {
        start: {
          dateTime: new Date(startDateTime)
        },
        end: {
          dateTime: new Date(endDateTime)
        },
        summary: summary
      }
    });
    res.send(response.data);
  } catch (error) {
    console.error('error edit the event')
    res.status(500).json({error:'edit event error'})
  }
 
  
})

const PORT =process.env.PORT || 3000;
app.listen(PORT, () => console.log(`running in port${PORT}`))