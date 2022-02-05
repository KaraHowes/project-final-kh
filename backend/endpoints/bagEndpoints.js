const Member = require('../Schemas/member.js')
const Bag = require('../Schemas/bag.js')


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
      res.status(400).json({ response: error, success: false });
    }
  }

  // endpoint to fetch all bags

  export const allBags = async (req,res) =>  {
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
  
      if (foundBags.length === 0) {
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