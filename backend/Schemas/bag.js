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
      required: true,
    },
    age: {
        type: String,
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'}
});

const Bag = mongoose.model("Bag", BagSchema);
module.exports = Bag