import mongoose from 'mongoose';


export const BagSchema = new mongoose.Schema({
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
    age: {
        type: String,
    },
    imageUrl: {
        type: String,
        //required: true,
      },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'}
});