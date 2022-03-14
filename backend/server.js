import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";


import quotesData from "./data/quotes.json";

import authenticateMember from "./authorization/authenticateMember.js"
import { register, signIn, allMembers, profile } from "./endpoints/memberEndpoints.js"
import { addBag, allBags, bagById, searchBags, bagByMember, deleteBag, reserveBag} from "./endpoints/bagEndpoints.js"
import { generateQuote } from "./endpoints/quoteEndpoint.js"

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


//----------Routes---------------
app.get("/", (req, res) => {
  res.send(
    "Hello all, Welcome to Thek-Friends. Add /endpoints in URL bar to view all RESTful endpoints"
  );
});

app.get("/endpoints", (req, res) => res.send(listEndpoints(app)));// to view all endpoints

// -------member endpoints----------

app.post("/signup", register)//endpoint to register
app.post("/signin", signIn)//endpoint to sign-in
app.get("/members", authenticateMember, allMembers);//create end-point to view all members
app.get("/member/:memberId", authenticateMember, profile);// endpoint to find one member for profile page


//-------Bag Endpoints----------

app.post("/bags", authenticateMember, addBag);//add a bag to the database, again to authorized members
app.get("/bags", authenticateMember, allBags);// gets all bags in the system
app.get("/bag/:_id", authenticateMember, bagById);//gets one particular bag by it's id
app.delete("/deleteBag/:_id", authenticateMember, deleteBag);//deletes one particular bag by it's id
app.get("/searchbags", authenticateMember, searchBags); //searches the bag database
app.get("/bags/:memberId", authenticateMember, bagByMember)//gets bags added by one particular member
app.post("/reserveBag", authenticateMember, reserveBag)// endpoint to reserve bag


//--------- for inspiration api--------
app.get("/inspiration", generateQuote)

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
