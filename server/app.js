const express = require("express");
const cookieParser = require("cookie-parser");
const bcryptjs = require("bcrypt");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

// Import Schemas
const Users = require("./models/userSchema");
const Post = require("./models/postSchema");
const Hostel = require("./models/hostelSchema");
// const Contacts = require('./models/contactSchema');

// connect to db
require("./db/connection");

// Import Middlewares
const authenticate = require("./middleware/auth");
const { default: axios } = require("axios");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 8000;

app.post("/api/register", async (req, res, next) => {
  try {
    const { username, email, password, userType } = req.body;

    if (!username || !email || !password || !userType) {
      res.status(400).send("Cannot be empty");
    }

    const isExist = await Users.findOne({ $or: [{ email }, { username }] });
    if (isExist) {
      res.status(400).send("User already exist");
    } else {
      const user = new Users({
        username,
        email,
        userType,
      });
      bcryptjs.hash(password, 10, async (err, hashedPassword) => {
        if (err) next(err);
        await user.set("password", hashedPassword);
        await user.save();
        return res.status(200).send("Successfully Registered");
      });
    }
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error, "error");
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.status(400).send("Cannot be empty");
  }
  const user = await Users.findOne({ $or: [{ email }, { username: email }] });
  if (!user) {
    res.status(402).send("User or password is invalid");
  } else {
    const validate = await bcryptjs.compare(password, user.password);
    if (!validate) {
      res.status(401).send("User or password is invalid");
    } else {
      const payload = {
        id: user._id,
        username: user.username,
      };
      const JWT_SECRET_KEY =
        process.env.JWT_SECRET_KEY || "THIS_IS_THE_SECRET_KEY_OF_JWT";
      jwt.sign(
        payload,
        JWT_SECRET_KEY,
        { expiresIn: 86400 },
        async (err, token) => {
          if (err) res.json({ message: err });
          await Users.updateOne(
            { _id: user._id },
            {
              $set: { token },
            }
          );
          user.save();
          return res.status(200).json({ user, token });
        }
      );
    }
  }
});

app.post("/api/verify-hostel", authenticate, async (req, res) => {
  try {
    // const { caption, desc, url } = req.body;
    const { user } = req;
    if (Object.keys(req.body).length === 0) {
      res.status(400).send("Please fill all the fields");
    }
    const isAlreadySubmitted = await Post.findOne({ user: user._id });
    if (isAlreadySubmitted) {
      res.status(400).send("Already Submitted");
    }
    const createPost = new Post({
      ...req.body,
      user: user._id,
    });
    await createPost.save();
    res.status(200).send("Request Submit Successfully");
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});

app.get("/api/verify-status", authenticate, async (req, res) => {
  try {
    const { user } = req;
    const post = await Post.findOne({ user: user._id });
    if (!post) {
      return res.status(200).json({ status: "not found" });
    }
    if (post.confirmed) {
      return res.status(200).json({ status: "verified" });
    }
    return res.status(200).json({ status: "not-verified" });
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});

app.post("/api/add-hostel", authenticate, async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send("Please fill all the fields");
    }
    const { user } = req;
    const hostel = new Hostel({
      ...req.body,
      user: user._id,
    });
    await hostel.save();
    res.status(200).send("Hostel Added Successfully");
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});

app.get("/api/requests", authenticate, async (req, res) => {
  try {
    const requests = await Post.find({ confirmed: false });
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});

app.put("/api/requests/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });
    if (!post) {
      res.status(400).send("Request not found");
    }
    post.set("confirmed", true);
    await post.save();
    res.status(200).send("Request Confirmed");
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});

app.get("/api/hostels", async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json({ hostels });
  } catch (error) {}
});

app.get("/api/hostels/search", async (req, res) => {
  const { hostelName, city, country, type } = req.query;
  const filter = {};
  if (hostelName) filter.hostelName = { $regex: hostelName, $options: "i" };
  if (city) filter.city = { $regex: city, $options: "i" };
  if (country) filter.country = { $regex: country, $options: "i" };
  if (type) filter.type = { $regex: type, $options: "i" };
  try {
    const hostels = await Hostel.find(filter);
    res.json(hostels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log("Server is running");
});
