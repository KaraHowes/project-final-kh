import mongoose from "mongoose"

export const QuoteSchema = new mongoose.Schema({
    quote: { type: String },
    source: { type: String },
  });

const Quote = mongoose.model("Quote", QuoteSchema);
module.exports = Quote
