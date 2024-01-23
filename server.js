const PORT = 8080;
const express = require("express");
const cors = require("cors");
const app = express();
const API_KEY = "sk-x3mllQG0myrvboo6BvsQT"+"3BlbkFJ4UE9WiaCq2fGQE0a5Cpy";

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log("Your server is running on " + PORT));

app.post("/", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("Error " + error);
  }
});
