// +---------+
// | Modules |
// +---------+
var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");


// +----------------+
// | Database Setup |
// +----------------+
var dbUser = "purag",
    dbPass = "password",
    dbURL  = "ds027744.mongolab.com:27744/mongo_test";
mongoose.connect("mongodb://" + dbUser + ":" + dbPass + "@" + dbURL);

// Defining structure of saved data
var messageSchema = mongoose.Schema({
  username : String,
  message  : String,
  date     : Date
});

// Saving defined structure for later retrival
var messageModel = mongoose.model('Messages', messageSchema);


// +--------------+
// | Webapp setup |
// +--------------+

// run on the system's default PORT, or 8080 if not set
var port = process.env.PORT || 8080;

// tell express to serve up static content from the public/ directory
app.use( express.static("./public") );

// parse POST request bodies as JSON
app.use( bodyParser.urlencoded({extended:false}) );


// +---------+
// | Routing |
// +---------+
    // Clean URLS - ONLY MENTION IF ASKED, or ASK IF THEY WANT IT!
    // app.get("/", function (req, res) {
    //   return res.sendFile("./public/index.html");
    // });
    // app.get('/:file', function (req, res) {
    //   return res.sendFile("./public/" + req.params.file + ".html");
    // });

// TODO: Save new messages to database.
app.post("/sendMessage", function (req, res) {
  var name = req.body.username;
  var msg  = req.body.message;

  var newMessage = new messageModel({
    username : name,
    message  : msg,
    date     : new Date()
  });

  newMessage.save(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
});

// TODO: Grab messages from database to update front end.
app.get("/getMessages", function (req, res) {
  messageModel.find({}).sort({date:1}).exec(function (err,data) {
    // Send the messages back
    return res.send({
      messages : data
    });
  });
});


// +----------------+
// | Initialization |
// +----------------+
app.listen( port );
console.log("Running on " + port);
exports = module.exports = app;