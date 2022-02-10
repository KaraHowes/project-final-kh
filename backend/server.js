import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import nodemailer from "nodemailer"

import quotesData from "./data/quotes.json";

import authenticateMember from "./authorization/authenticateMember.js"
import { register, signIn, allMembers, profile } from "./endpoints/memberEndpoints.js"
import { addBag, allBags, bagById, searchBags, bagByMember, deleteBag} from "./endpoints/bagEndpoints.js"

import dotenv from "dotenv";
import cloudinaryFramework from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/finalKH";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080
const port = process.env.PORT || 8080;
const app = express();

//------------ Middlewares ---------------------------

app.use(cors());
app.use(express.json());
dotenv.config();

//------------ Image set-up----------------------------

const cloudinary = cloudinaryFramework.v2;
cloudinary.config({
  cloud_name: "khf1nal",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "theks",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const parser = multer({ storage });

app.get("/", (req, res) => {
  res.send(
    "Hello all, Welcome to Thek-Friends. Add /endpoints in URL bar to view all RESTful endpoints"
  );
});
// to view all endpoints
app.get("/endpoints", (req, res) => res.send(listEndpoints(app)));

// -------member endpoints----------

app.post("/signup", register)

//endpoint to sign-in
app.post("/signin", signIn)

//create end-point to view all members
app.get("/members", authenticateMember, allMembers);

// endpoint to find one member

app.get("/member/:memberId", authenticateMember, profile);


//-------Bag Endpoints----------

//, parser.single('image')
//endpoint to add a bag to the database, again to authorized members
app.post("/bags", authenticateMember, addBag);

app.get("/bags", authenticateMember, allBags);

app.get("/bag/:_id", authenticateMember, bagById);
app.delete("/deleteBag/:_id", authenticateMember, deleteBag);


app.get("/searchbags", authenticateMember, searchBags);

app.get("/bags/:memberId", authenticateMember, bagByMember)


//--------- for inspiration api--------
// stays in server.js due to functions performed
const QuoteSchema = new mongoose.Schema({
  quote: { type: String },
  source: { type: String },
});

const Quote = mongoose.model("Quote", QuoteSchema);

//Fills database with data from my API
if (process.env.RESET_DB) {
  // need to use an async function so that the users are deleted before
  const seedDatabase = async () => {
    await Quote.deleteMany({});

    quotesData.forEach((item) => {
      const newQuote = new Quote(item);
      newQuote.save();
    });
  };
  seedDatabase();
}

app.get("/inspiration", async (req, res) => {
  const Quotes = await Quote.find({});
  const getRandomAffirmation = () =>
    Quotes[Math.floor(Math.random() * Quotes.length)];
    const random = getRandomAffirmation()
  res.status(200).json({ 
   response: random, success: true });
});

// endpoint to book bag

app.post("/reserveBag", async (req,res) => {
  
  const { email }= req.body
  const main = async () =>{
// Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "KHFinal22@outlook.com", // generated ethereal user
      pass: "blanket1815", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mailOptions = await transporter.sendMail({
    from: '"KH" <KHFinal22@outlook.com>', // sender address
    to: email, // list of receivers
    subject: "Interested in Thek", // Subject line
    text: "Thank you for registering your interest in the Thek, we will get back to you shortly", // plain text body
    html: "<b>Thank you for registering your interest in the Thek, we will get back to you shortly. You really are awesome</b>", // html body
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(400).json({ response: 'error', success: false })
    } else {
      console.log('Email sent: ' + info.response)
      res.status(200).json({ response: 'Email sent', success: true })
    }
  })
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  }
  
main().catch(console.error);

})



// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
