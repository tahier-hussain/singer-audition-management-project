//Model
const Singer = require("../models/singer");
const Song = require("../models/song");

exports.create = (req, res) => {
  console.log(req.body);
  let file;
  if (req.files.file) {
    file = req.files.file;
    console.log(file.data);
    file.mv(`/home/tahier/Codingmart-tasks/singer-audition-management/singer-audition-management-front-end/client/public/${file.name}`);
  }

  Singer.findById(req.user.id)
    .select("-password")
    .then(singer => {
      const newSong = new Song({
        singer_id: req.user.id,
        title: req.body.title,
        song: file.name
      });

      newSong
        .save()
        .then(data => res.json(data))
        .catch(() =>
          res.status(400).json({
            msg: "Something went wrong"
          })
        );
    });
};

exports.get = (req, res) => {
  Song.find()
    .sort({ register_date: -1 })
    .then(songs => res.json(songs))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getSingerSongs = (req, res) => {
  Song.find({ singer_id: req.body.id })
    .sort({ register_date: -1 })
    .then(songs => res.json(songs))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.update = (req, res) => {
  Singer.findById(req.user.id)
    .select("-password")
    .then(singer => {
      Song.findByIdAndUpdate(req.body.id, req.body)
        .then(song => res.json(song))
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};

exports.delete = (req, res) => {
  console.log(req.body);
  Singer.findById(req.user.id)
    .select("-password")
    .then(singer => {
      Song.find({ singer_id: req.user.id })
        .then(() => {
          Song.findByIdAndDelete(req.body.id)
            .then(song => res.json(song))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};
