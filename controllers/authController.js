const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');


exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "Қолданушы аты, email және құпия сөз қажет" });
  }

  try {
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (checkUser.rows.length > 0) {
      return res.status(409).json({ error: "Бұл username немесе email бұрын қолданылған" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
      [username, hashedPassword, email]
    );

    res.status(201).json({ message: "Тіркелу сәтті өтті" });
  } catch (e) {
    console.error("Register қатесі:", e.message);
    res.status(500).json({ error: "Сервер қатесі: " + e.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email және құпия сөз қажет" });
  }

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Қолданушы табылмады" });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Құпия сөз қате" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JSON_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Кіру сәтті өтті", token });
  } catch (err) {
    alert("Сәтті тіркелді!")

  }
};


exports.booking = async (req, res) => {
  const userId = req.user.id;
  const { place_name, date, time } = req.body;

  console.log(req.body);
  
  console.log('place_name:', `"${place_name}"`);
  
  if (!userId) return res.status(500).json({ message: "Қолданушының ID алынбады!" });

  try {
    let result = await pool.query(
      'INSERT INTO bookings (user_id,place_name,date,time) VALUES ($1,$2,$3,$4) RETURNING *',
      [userId, place_name, date, time]
    );

    if (result.rows.length > 0) {
      res.status(201).json({ message: "Venue successfully booked!", venue: result.rows[0] });
    } else {
      res.status(500).json({ message: "Venue booking failed!" });
    }
  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).json({ error: "Сервер қатесі: " + err.message });
  }
};
