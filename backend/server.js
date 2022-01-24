import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import listEndpoints from "express-list-endpoints";


const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/finalKH';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
//mongoose.set('useCreateIndex', true); //added due to deprecation error 26868
mongoose.Promise = Promise;

const MemberSchema = new mongoose.Schema({
	membername: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString('hex'),
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	location: {
		type: String,
		
	},
	status: {
		type: String,
		reuired: true,
	}
	
});

const Member = mongoose.model('Member', MemberSchema);

const BagSchema = new mongoose.Schema({
	  colour: {
		  type: String, 
		  required: true,  
	  },
	  location: {
		  type: String,
		  required: true,
	  }, 
	  createdAt: {
		type: Date,
		default: Date.now,
		// can also be written as () => Date.now(), as an anonymous call-back function
		required: true,
	  },
});

const Bag = mongoose.model('Bag', BagSchema);

// Defines the port the app will run on. Defaults to 8080
const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// authenticates member
const authenticateMember = async (req, res, next) => {
	const accessToken = req.header('Authorization'); // to send in header is kind of unique for accessToken

	try {
		const member = await Member.findOne({ accessToken });
		if (member) {
			next();
		} else {
			res.status(401).json({
				response: {
					message: 'Please, log in',
				},
				success: false,
			});
		}
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
};

// Authentication - 401 (Unauthorized) But should be unauthenticated
// Authorization - 403 (Forbidden) But should be unauthorized

// Start defining your routes here

app.get("/", (req, res) => {
	res.send(
	  "Hello all, Welcome to Thek-Friends. Add /endpoints in URL bar to view all RESTful endpoints"
	);
});
  // to view all endpoints
  app.get("/endpoints", (req, res) => res.send(listEndpoints(app)));

 // To register 
  app.post('/signup', async (req, res) => {
	const { membername, password, email, location, status } = req.body;

	try {
		const salt = bcrypt.genSaltSync();

		if (password.length < 5) {
			throw { message: 'Password must be at least 5 characters long' };
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
app.post('/signin', async (req, res) => {
	const { membername, password, email} = req.body;

	try {
		const member = await Member.findOne({ membername });

		if (member && bcrypt.compareSync(password, member.password)) {
			res.status(200).json({
				response: {
					memberId: member._id,
					membername: member.membername,
					accessToken: member.accessToken,
					email: member.email,
					location: member.location,
					status: member.status,	
				},
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
app.get('/members', authenticateMember)
app.get('/members', async (req, res) => {
	const members = await Member.find({})
	res.json(members)
   })
 // endpoint to find one member
 
//app.get('/member/:memberId', authenticateMember)
 app.get('/member/:memberId', async (req,res) => {
	 const { memberId } = req.params;
	const member = await Member.findById(memberId) 
res.status(200).json({response: member, success: true})
})

//this function will only be available to authorized members with an access token
app.get('/bags', authenticateMember);
app.get('/bags', async (req, res) => {
	//res.send('here are your bags')
	const bags = await Bag.find({});
	res.status(201).json({ response: bags, success: true });
});
//endpoint to add a bag to the database, again to authorized members
app.post('/bags', authenticateMember);
app.post('/bags', async (req, res) => {
	const {colour, location} = req.body;

	try {
		const newBag = await new Bag({ 
			colour,
			location,
		 }).save();
		res.status(201).json({ 
			response:{
				bagId: newBag._id,
				location: newBag.location,
				colour: newBag.colour,
			},
			success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});


// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
