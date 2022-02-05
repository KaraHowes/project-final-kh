const Member = require('../Schemas/member.js')


import bcrypt from "bcrypt";


// ------- Member Endpoints----------- //

// ----- to register ------- //

// Endpoint to register
 export const register = async (req, res) => {
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
  }
// Endoint to sign in
  export const signIn = async (req,res) => {
    const { membername, password } = req.body;
  
    try {
      const member = await Member.findOne({ membername });
  
      if (member && bcrypt.compareSync(password, member.password)) {
        res.status(200).json({
          response: {
            _id: member._id,
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
  }

  // endpoint to see all members 

  export const allMembers = async (req,res) => {
    const members = await Member.find({});
    res.json(members);
  }
  
// enndpoint to see profile
  export const profile = async (req, res) => {
    const { memberId } = req.params;
    const member = await Member.findById(memberId); 
    res.status(200).json({ response: member, success: true });
  }


  