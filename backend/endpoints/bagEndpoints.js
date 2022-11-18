const Member = require('../Schemas/member.js')
const Bag = require('../Schemas/bag.js')
import nodemailer from "nodemailer"

//Endpoint to add a bag
export const addBag = async (req,res) => {
    const { colour, location, age, memberId } = req.body;
  
    try {
      const queriedMember = await Member.findById(memberId).populate("member");
      const newBag = await new Bag({
        colour,
        location,
        age,
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
      res.status(400).json({ response: "Could not add bag to the system", success: false });
    }
  }

  // endpoint to fetch all bags

  export const allBags = async (req,res) =>  {
    const bags = await Bag.find({});
    res.status(201).json({ response: bags, success: true });
  }
  export const guestBags = async (req,res) =>  {
    const bags = await Bag.find({});
    res.status(201).json({ response: bags, success: true });
  }
  //endpoint to 
   export const bagById = async (req,res) => {
    const { _id } = req.params;
    const bag = await Bag.findById(_id).populate("member");
    res.status(200).json({ response: bag, success: true });
  }

  //endpoint to search the bags database

  export const searchBags = async (req,res) => {

    try {
      const foundBags = await Bag.find(req.query);
  
      if (!foundBags.length) {
        res.status(404).json({
          response: "no bags found",
          success: false,
        });
      } else {
        res.status(201).json({
          response: foundBags,
          success: true,
        });
      }
    } catch (error) {
      res.status(400).json({ response: error, success: false });
    }
  }


// finding bag associated with member
  export const bagByMember = async (req,res) => {
    const { memberId } = req.params;
  
    try {
      const queriedBagMember = await Bag.find({member:memberId})
      if(queriedBagMember){
        res.status(201).json({
          response: queriedBagMember,success: true,
        });
      } else {
        res.status(404).json({
          response: "Could not find tasks",
          success: false,
        });
      }

     
    } catch (error) {
      res.status(400).json({ response: "Invalid request", response: error, success: false });
    }
  }

export const deleteBag = async (req,res) => {
  const{ _id } = req.params
  try {
    const deleteBag= await Bag.findOneAndDelete({ _id });;
    if (deleteBag) {
      res.status(200).json({ response: deleteBag, success: true });
    } else {
      res.status(404).json({ response: "Could not find bag", success: false });
    }
   
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
}

export const reserveBag = async (req,res) => {
  const { email }= req.body
  const main = async () =>{

  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD
    },
  });

 
  let mailOptions = await transporter.sendMail({
    from: process.env.EMAIL, 
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
  }
  
main().catch(console.error);

}


