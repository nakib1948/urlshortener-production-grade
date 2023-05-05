const bcrypt = require("bcrypt");
const shortid = require("shortid");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db");

module.exports = async function registerUser(req, res) {
  let { name, email, password, password2 } = req.body;

  if (!name || !email || !password || !password2) {
    return res.status(400).json({ error: "Please enter all fields" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password should be at least 6 characters" });
  }
  if (password != password2)
    return res.status(400).json({ error: "Passwords do not match" });

  const hashedPassword = await bcrypt.hash(password, 10);
  pool.query(`SELECT * FROM users WHERE email=$1`, [email], (err, results) => {
    if (err) {
      throw err;
    }
    if (results.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    } else {
      pool.query(
        `
          INSERT INTO users (name,email,password)
          VALUES ($1,$2,$3)
          RETURNING id,password
          `,
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            throw err;
          }
          return res.status(201).json({
            message: "You are now registered. Please login",
            data: result.rows,
          });
        }
      );
    }
  });
};
