const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send({
    message: "subscription server!!",
  });
});

app.post("/subscribe", async (req, res) => {
  const email = req.body.email;

  const data = {
    data: {
      type: "profile",
      attributes: {
        email: email,
      },
    },
  };

  try {
    const response = await axios.post(
      "https://a.klaviyo.com/api/profiles/",
      data,
      {
        headers: {
          accept: "application/json",
          revision: "2024-06-15",
          "content-type": "application/json",
          Authorization: `Klaviyo-API-Key ${process.env.API_KEY}`,
        },
      }
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
