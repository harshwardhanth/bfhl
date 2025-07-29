const express = require("express");
const app = express();

app.use(express.json());


const FULL_NAME = "john_doe";
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";


app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input: data must be an array." });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    const alphaConcat = [];

    let sum = 0;

    data.forEach((item) => {
      const strItem = String(item);

      if (/^\d+$/.test(strItem)) {
        const num = Number(strItem);
        sum += num;
        (num % 2 === 0 ? even_numbers : odd_numbers).push(strItem);
      } else if (/^[a-zA-Z]+$/.test(strItem)) {
        alphabets.push(strItem.toUpperCase());
        alphaConcat.push(strItem);
      } else if (/[^a-zA-Z0-9]/.test(strItem)) {
        special_characters.push(strItem);
      }
    });

   
    const reversed = alphaConcat.join("").split("").reverse();
    const concat_string = reversed
      .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
      .join("");

    const response = {
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      error: err.message || "Internal Server Error",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
