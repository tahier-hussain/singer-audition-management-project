//Model
const User = require("../models/user");
const ProductionUnit = require("../models/production-unit");
const Singer = require("../models/singer");
const Moderator = require("../models/user");
const nodemailer = require("nodemailer");

exports.get = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getSingers = (req, res) => {
  Singer.find()
    .then(singers => res.json(singers))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.singerDetails = (req, res) => {
  Singer.findById(req.body.id)
    .then(singer => res.json(singer))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.selectSinger = (req, res) => {
  Moderator.findById(req.user.id).then(() => {
    let obj = {
      audition_decision_finalised: true,
      audition_status: true
    };
    Singer.findByIdAndUpdate(req.body.id, obj)
      .then(async singer => {
        res.json(singer);
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
          <p><strong>We are happy to inform you that you have been shortlisted for the singing competition.</strong></p>
          <p>Futher details about the competition will be informed to you shortly. We wish you all the luck for the upcoming competition.</p>
          <p></p>
          <p>Thanks & Regards,</p>
          <p>Production Unit team</p>
          `;

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Tahier Hussain" <tahier@codingmart.com>', // sender address
          to: singer.email, // list of receivers
          subject: "Selected in the Competition", // Subject line
          text: "Audition", // plain text body
          html: output // html body
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      })
      .catch(() => res.status(400).json({ msg: "Something went wrong" }));
  });
};

exports.rejectSinger = (req, res) => {
  Moderator.findById(req.user.id).then(() => {
    let obj = {
      audition_decision_finalised: true,
      audition_status: false
    };
    Singer.findByIdAndUpdate(req.body.id, obj)
      .then(async singer => {
        res.json(singer);
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
          <p><strong>We are sorry to inform you that you have been rejected by our judges in the audition</strong></p>
          <p>We wish you all the very best for your future. We will be having your data and will let you know if our team decides to reconsider it.</p>
          <p></p>
          <p>Thanks & Regards,</p>
          <p>Production Unit team</p>
          `;

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Tahier Hussain" <tahier@codingmart.com>', // sender address
          to: singer.email, // list of receivers
          subject: "Rejected from the competition", // Subject line
          text: "Audition", // plain text body
          html: output // html body
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      })
      .catch(() => res.status(400).json({ msg: "Something went wrong" }));
  });
};
