const express = require("express"),
  bodyParser = require("body-parser"),
  tasklist = require("../model/createtask"),
  router = express.Router(),
  cors = require("cors");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/api/createtask', (req, res) => {
  const name = req.body.name,
    date = req.body.date,
    description = req.body.description,
    period = req.body.period;

  const newdata = { taskname: name, duedate: date, description: description, period: period };
  tasklist.create(newdata)
    .then((result) => {
      console.log("Data added to the database");
    })
    .catch((err) => {
      console.log(err);
    })
})

router.delete('/delete/:id', (req, res) => {
  const itemId = req.params.id;

  tasklist.findByIdAndDelete(itemId)
    .then(() => {
      console.log("successfully deleted");
      res.status(200).send("Item deleted successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting item");
    })
});


router.get('/api/tasklist', (req, res) => {
  tasklist.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    })
});

module.exports = router;
