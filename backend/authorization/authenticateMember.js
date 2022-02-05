const Member = require("../Schemas/member.js")

const authenticateMember = async (req, res, next) => {
    const accessToken = req.header("Authorization"); // to send in header is kind of unique for accessToken
  
    try {
      const member = await Member.findOne({ accessToken });
      if (member) {
        next();
      } else {
        res.status(401).json({
          response: {
            message: "Please, log in",
          },
          success: false,
        });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid request", response: error, success: false });
    }
  };

  export default authenticateMember