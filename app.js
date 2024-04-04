// app.js
import express from 'express';
import emailer from './emailer.js';
import multer from 'multer';
const upload = multer();
const app = express();
const port = 3000;

// Express middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Express middleware to parse JSON bodies (sent by API clients)
app.use(express.json());

app.get("/", (req,res) => {
    res.render('contact.ejs')
}
)

app.post('/contact', upload.none(), emailer);


// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
