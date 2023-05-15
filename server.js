const express = require("express");
const multer = require("multer");
const { db, connect } = require("./connect.js");
const app = express();
const port = 3000;

// connect to MongoDB
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// serving static files in Express
app.use(express.static("public"));

// setting views to views folder
app.set("view engine", "ejs").set("views", "views");

// urlencoded for form data
app.use(express.urlencoded({ extended: true }));

// Configure multer to specify where to save uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

// file upload
const upload = multer({ storage });

// routes GET requests
app
  .get("/", async (req, res, next) => {
    try {
      const trips = await db.collection("trips").find().toArray();
      res.render("index.ejs", { trips: trips });
    } catch (err) {
      next(err);
    }
  })
  .get("/trips", async (req, res, next) => {
    try {
      const user = await db.collection("users").findOne({ name: "Bahaa" });
      const trips = await db.collection("trips").find().toArray();
      console.log(trips);
      res.render("trips.ejs", { user: user, trips: trips });
    } catch (err) {
      next(err);
    }
  })
  .get("/trips/:trip", (req, res) => {
    res.render("trip_details.ejs");
  })
  .get("/trips/:trip/book", (req, res) => {
    res.render("book.ejs");
  })
  .get("/trips/:trip/book/:bookingNR/confirmed", (req, res) => {
    res.render("confirmed.ejs");
  })

  .get("/users/:user", (req, res) => {
    const user = req.params.user;
    res.render("profile.ejs", {
      user: user,
    });
  });

// routes POST requests
app.post("/trips", upload.single("image"), async (req, res, next) => {
  try {
    const { destination } = req.body;
    const imagePath = req.file.filename;

    // Insert the new trip into the MongoDB collection
    await db.collection("trips").insertOne({ destination, image: imagePath });

    res.redirect("/trips"); // Redirect to the trips page after successful submission
  } catch (err) {
    next(err);
  }
});

// 404 page
// .use((req, res) => {
//     res.status(404).render('not_found.ejs');
// });
