const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { db, connect } = require("./connect");
const app = express();
const port = 3000;

// connect to MongoDB
const connectDB = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

// call the connectDB function
connectDB();

// serving static files in server
app.use(express.static("public"));

// set templating engine
app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs").set("views", "views");

// urlencoded for form data
app.use(express.urlencoded({ extended: true }));

// routes GET requests
app
  .get("/", async (req, res) => {
    try {
      const user = await db
        .collection("users")
        .findOne({ first_name: "Bahaa" });
      const trips = await db.collection("trips").find().toArray();
      res.render("index.ejs", {
        title: "Home",
        user: user,
        trips: trips,
      });
    } catch (err) {
      next(err);
    }
  })
  .get("/trips", async (req, res) => {
    try {
      const user = await db
        .collection("users")
        .findOne({ first_name: "Bahaa" });
      const trips = await db.collection("trips").find().toArray();
      res.render("trips.ejs", {
        title: "Trips",
        user: user,
        trips: trips,
      });
      // console.log(trips);
    } catch (err) {
      next(err);
    }
  })
  .get("/trips/:trip", async (req, res, next) => {
    try {
      const user = await db
        .collection("users")
        .findOne({ first_name: "Bahaa" });
      const tripSlug = req.params.trip;
      const trip = await db.collection("trips").findOne({ slug: tripSlug });
      if (!trip) {
        res.status(404).render("not_found.ejs");
        return;
      }
      console.log(trip);
      res.render("trip_details.ejs", {
        title: trip.destination,
        user: user,
        trip: trip,
      });
    } catch (err) {
      next(err);
    }
  })
  .get("/trips/:trip/book", async (req, res, next) => {
    try {
      const user = await db
        .collection("users")
        .findOne({ first_name: "Bahaa" });
      const tripSlug = req.params.trip;
      const trip = await db.collection("trips").findOne({ slug: tripSlug });

      // format date
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${day}-${month}-${year}`;
      };
      trip.availability.forEach((available) => {
        if (available.start_date) {
          available.start_date = formatDate(available.start_date);
        }
        if (available.end_date) {
          available.end_date = formatDate(available.end_date);
        }
      });

      if (!trip) {
        res.status(404).render("not_found.ejs");
        return;
      }
      // console.log(trip);
      res.render("book.ejs", {
        title: trip.destination + " - Book",
        user: user,
        trip: trip,
      });
    } catch (err) {
      next(err);
    }
  })
  .post("/trips/:trip/book", async (req, res, next) => {
    const user = await db.collection("users").findOne({ first_name: "Bahaa" });
    const tripSlug = req.params.trip;
    const trip = await db.collection("trips").findOne({ slug: tripSlug });
    // const dateRange = req.body;
    // const selectedRoom = req.body;
    const data = {
      destination: trip.destination,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      ...req.body,
    };

    await db.collection("bookings").insertOne(data);
    console.log(data);
    res.redirect("/trips/" + tripSlug + "/book/confirmed");
  })
  .get("/trips/:trip/book/confirmed", async (req, res, next) => {
    const user = await db.collection("users").findOne({ first_name: "Bahaa" });
    try {
      // console.log(trip);
      res.render("confirmed.ejs", {
        title: "Booking Confirmed",
        user: user,
      });
    } catch (err) {
      next(err);
    }
  })

  // 404 page
  .use((req, res) => {
    res.status(404).render("not_found.ejs", { title: "404 Not found" });
  });

// .get("/trips/:trip/book", (req, res) => {
//   res.render("book.ejs");
// })
// .get("/trips/:trip/book/:bookingNR/confirmed", (req, res) => {
//   res.render("confirmed.ejs");
// })

// .get("/users/:user", (req, res) => {
//   const user = req.params.user;
//   res.render("profile.ejs", {
//     user: user,
//   });
// });

// Configure multer to specify where to save uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     const fileName = Date.now() + "-" + file.originalname;
//     cb(null, fileName);
//   },
// });

// file upload
// const upload = multer({ storage });

// routes POST requests
// app.post("/trips", upload.single("image"), async (req, res, next) => {
//   try {
//     const { destination } = req.body;
//     const imagePath = req.file.filename;

//     // Insert the new trip into the MongoDB collection
//     await db.collection("trips").insertOne({ destination, image: imagePath });

//     res.redirect("/trips"); // Redirect to the trips page after successful submission
//   } catch (err) {
//     next(err);
//   }
// });
