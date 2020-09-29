const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Singer Model
const Singer = require("../models/singer");

exports.login = (req, res) => {
  console.log("Hello");
  const { email, password } = req.body;
  //Simple validation
  if (!email || !password) {
    return res.json({
      status: 400,
      msg: "Please enter all the fields "
    });
  }

  //Check for existing singer
  Singer.findOne({ email }).then(singer => {
    if (!singer)
      return res.json({
        status: 400,
        msg: "Singer does not exist "
      });

    //Validate password
    bcrypt.compare(password, singer.password).then(isMatch => {
      if (!isMatch)
        return res.json({
          status: 400,
          msg: "Invalid Credentials"
        });

      jwt.sign({ id: singer.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          status: 200,
          token,
          users: {
            id: singer.id,
            name: singer.name,
            email: singer.email,
            description: singer.description,
            family_background: singer.family_background,
            journey_to_singer: singer.journey_to_singer,
            audition_decision_finalised: singer.audition_decision_finalised,
            audition_status: singer.audition_status,
            address: singer.address,
            latitude: singer.latitude,
            longitude: singer.longitude,
            image: singer.image,
            type: "singer",
            message: "Logged in successfully"
          }
        });
      });
    });
  });
};
