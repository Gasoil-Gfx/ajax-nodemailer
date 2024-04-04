// app.js
import express from 'express';
import rateLimit from 'express-rate-limit';
import emailer from './emailer.js';
import multer from 'multer';
const upload = multer();
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const contactPostLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
    max: 4,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: function (req, res /*, next */) {
      res.status(429).json({
        message: "Too many requests, please try again later."
      });
    }
  });
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes"
  });
  
  app.use(generalLimiter);

app.get("/", (req,res) => {
    res.render('contact.ejs')
}
)

app.post('/contact', upload.none(), contactPostLimiter, emailer);

app.listen(port, () => console.log(`Server listening on port ${port}`));
