import express from "express";
import cors from "cors";
import mongoose from "mongoose";
//import crypto from 'crypto';
import bcrypt from "bcrypt";
import listEndpoints from "express-list-endpoints";

import dotenv from "dotenv";
import cloudinaryFramework from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import { MemberSchema } from "./Schemas/member";
import { BagSchema } from "./Schemas/bag";

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
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const parser = multer({ storage });

// creates models
const Member = mongoose.model("Member", MemberSchema);
const Bag = mongoose.model("Bag", BagSchema);

// authenticates member
const authenticateMember = async (req, res, next) => {
  const accessToken = req.header("Authorization"); // to send in header is kind of unique for accessToken

  try {
    const member = await Member.findOne({ accessToken });
    if (member) {
      next();
    } else {
      res.status(401).json({
        response: {
          message: "Please, log in",
        },
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

//------------ ROUTES------------------------------------

app.get("/", (req, res) => {
  res.send(
    "Hello all, Welcome to Thek-Friends. Add /endpoints in URL bar to view all RESTful endpoints"
  );
});
// to view all endpoints
app.get("/endpoints", (req, res) => res.send(listEndpoints(app)));

// To register
app.post("/signup", async (req, res) => {
  const { membername, password, email, location, status } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw { message: "Password must be at least 5 characters long" };
    }
    // creates the instance of a new member

    const newMember = await new Member({
      membername, // this is the same as username:username
      password: bcrypt.hashSync(password, salt),
      email,
      location,
      status,
    }).save();
    // res status 201 means something has been created
    res.status(201).json({
      response: {
        memberId: newMember._id,
        membername: newMember.membername,
        accessToken: newMember.accessToken,
        email: newMember.email,
        location: newMember.location,
        status: newMember.status,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//endpoint to sign-in
app.post("/signin", async (req, res) => {
  const { membername, password } = req.body;

  try {
    const member = await Member.findOne({ membername });

    if (member && bcrypt.compareSync(password, member.password)) {
      res.status(200).json({
        response: 
        { _id: member._id,
          membername: member.membername,
          accessToken: member.accessToken,
          email: member.email,
          location: member.location,
          status: member.status},
        
        success: true,
      });
    } else {
      res.status(404).json({
        response: "Username or password doesn't match",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//create end-point to view all members
app.get("/members", authenticateMember);
app.get("/members", async (req, res) => {
  const members = await Member.find({});
  res.json(members);
});
// endpoint to find one member

app.get("/member/:memberId", authenticateMember);
app.get("/member/:memberId", async (req, res) => {
  const { memberId } = req.params;
  const member = await Member.findById(memberId); //.populate('bag')
  res.status(200).json({ response: member, success: true });
});

//, parser.single('image')
//endpoint to add a bag to the database, again to authorized members
app.post("/bags", authenticateMember);
app.post("/bags", parser.single('image'), async (req, res) => {
  const { colour, location, age, memberId } = req.body;

  try {
    const queriedMember = await Member.findById(memberId).populate("member");
    const newBag = await new Bag({
      colour,
      location,
      age,
      imageUrl: req.file.path,
      member: queriedMember,
    }).save();

    res.status(201).json({
      response: {
        bagId: newBag._id,
        location: newBag.location,
        colour: newBag.colour,
        age: newBag.age,
        member: queriedMember,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});
//this function will only be available to authorized members with an access token
app.get("/bags", authenticateMember);
app.get("/bags", async (req, res) => {
  //res.send('here are your bags')
  const bags = await Bag.find({});
  res.status(201).json({ response: bags, success: true });
});

app.get("/bag/:_id", authenticateMember);
app.get("/bag/:_id", async (req, res) => {
  const { _id } = req.params;
  const bag = await Bag.findById(_id).populate("member");
  res.status(200).json({ response: bag, success: true });
});
//------------Trying to allow user to search database--------------PROBLEM!
app.get("/searchbags", authenticateMember);
app.get("/searchbags", async (req, res) => {
  //const {colour, location, age} = req.query;

  try {
    const foundBags = await Bag.find(req.query);

    if (foundBags.length === 0) {
      res.status(404).json({
        response: "no bags found",
        success: false,
      });
    } else {
      res.status(201).json({
        response:foundBags,
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

import quotesData from './data/quotes.json'

const Quote = mongoose.model("Quote", {
    quote: String,
    source: String,
})

//Fills database with data from my API
if (process.env.RESET_DB === "true") {
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
app.get("/inspiration", async(req,res)=> {
  const Quotes = quotesData
  const getRandomAffirmation = () => Quotes[Math.floor(Math.random() * Quotes.length)];
res.status(200).json({response:getRandomAffirmation(), success: true})
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
