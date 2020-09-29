const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//Singer Model
const Singer = require("../models/singer");

exports.register = (req, res) => {
  let file;
  if (req.files.file) {
    file = req.files.file;
    console.log(file.data);
    file.mv(`/home/tahier/Codingmart-tasks/singer-audition-management/singer-audition-management-front-end/client/public/${file.name}`);
  }
  console.log(req.body);

  const { name, email, address, latitude, longitude, description, family_background, journey_to_singer, password, confirm_password } = req.body;

  //Simple validation
  if (!name || !email || !password || !confirm_password || !address || !latitude || !longitude || !description || !journey_to_singer || !family_background) {
    return res.json({
      status: 400,
      msg: "Please enter all the fields "
    });
  }
  //Check for existing singer
  Singer.findOne({ email }).then(singer => {
    if (singer)
      return res.json({
        status: 400,
        msg: "Singer already exists "
      });

    if (password != confirm_password) {
      return res.json({
        status: 400,
        msg: "Password Didn't match"
      });
    }

    if (password.length < 8) {
      return res.json({
        status: 400,
        msg: "Password should be atleast 8 characters"
      });
    }

    var number = 0;
    var low_alph = 0;
    var up_alph = 0;
    var spl_char = 0;
    for (var i = 0; i < password.length; i++) {
      var ascii = password.charCodeAt(i);
      if (ascii >= 48 && ascii <= 57) {
        number = 1;
      } else if (ascii >= 65 && ascii <= 90) {
        up_alph = 1;
      } else if (ascii >= 97 && ascii <= 122) {
        low_alph = 1;
      } else {
        spl_char = 1;
      }
    }

    if (number != 1 || low_alph != 1 || up_alph != 1 || spl_char != 1) {
      return res.json({
        status: 400,
        msg: "Password not efficient"
      });
    }

    const newSinger = new Singer({
      name,
      email,
      password,
      address,
      latitude,
      longitude,
      description,
      family_background,
      journey_to_singer,
      image: file.name
    });

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newSinger.password, salt, (err, hash) => {
        if (err) throw err;
        newSinger.password = hash;
        newSinger.save().then(async singer => {
          jwt.sign({ id: singer.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              status: 200,
              token,
              users: {
                id: singer.id,
                name: singer.name,
                email: singer.email
              }
            });
          });
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "tahier@codingmart.com", // generated ethereal user
              pass: "hussain220598" // generated ethereal password
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          var output = `<p>Greetings,</p>
            <p>We are happy to inform you that you have been nominated by our team for the singing audition that's going to take place.</p>
            <p>We request you to login to our website and upload your singing audios. Our team will shortlist the singers based on the songs that you will upload.</p>
            <p>You code to login to our website is <strong>${req.body.password}</strong></p>
            <p>We wish you all the luck for the upcoming task. We will get back to you once the results have been announced</p>
            <p></p>
            <p>Thanks & Regards</p>
            `;

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"Tahier Hussain" <tahier@codingmart.com>', // sender address
            to: singer.email, // list of receivers
            subject: "Shortlisted for the Audition", // Subject line
            text: "Shortlisted for the Audition", // plain text body
            html: output // html body
          });
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
      });
    });
  });
};
