
const Quote = require('../Schemas/quote.js')

export const generateQuote = async (req, res) => {

    const Quotes = await Quote.find({});
    const getRandomAffirmation = () =>
      Quotes[Math.floor(Math.random() * Quotes.length)];
      const random = getRandomAffirmation()
    res.status(200).json({ 
     response: random, success: true });
  };