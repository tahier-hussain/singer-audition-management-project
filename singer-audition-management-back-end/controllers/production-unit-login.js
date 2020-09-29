const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Production Unit Model
const ProductionUnit = require("../models/production-unit");

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

  //Check for existing production unit
  ProductionUnit.findOne({ email }).then(productionUnit => {
    if (!productionUnit)
      return res.json({
        status: 400,
        msg: "Production unit does not exist "
      });

    //Validate password
    bcrypt.compare(password, productionUnit.password).then(isMatch => {
      if (!isMatch)
        return res.json({
          status: 400,
          msg: "Invalid Credentials"
        });

      jwt.sign({ id: productionUnit.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          status: 200,
          token,
          users: {
            id: productionUnit.id,
            name: productionUnit.name,
            email: productionUnit.email,
            type: "production-unit",
            message: "Logged in successfully"
          }
        });
      });
    });
  });
};
