const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "a86f34636109bba105ec3d244e3ef0b7";

app.post("/voice", async (req, res) => {
  try {
    const text = req.body.text;

    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
      {
        text: text,
        model_id: "eleven_monolingual_v1"
      },
      {
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );

    const audioBase64 = Buffer.from(response.data).toString("base64");

    res.json({
      audio: `data:audio/mpeg;base64,${audioBase64}`
    });

  } catch (error) {
    res.status(500).send("Error generating voice");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});