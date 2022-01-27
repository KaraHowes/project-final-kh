import mongoose from 'mongoose';

import quotesData from '../data/quotes.json'

const Quote = mongoose.model("Quote", {
    quote: String,
    source: String
})