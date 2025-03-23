const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const urlRoute = require("./routes/url");

const app = express();
const PORT = 8002;

connectToMongoDB("mongodb+srv://sanyamshivhare11:RAJLMQJLYKZUGEJW@urlshortner.f273y.mongodb.net/?retryWrites=true&w=majority&appName=urlshortner").then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", urlRoute);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views")); // Ensure your views are in the "views" folder

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));