const bcrypt = require("bcrypt");
const shortid = require("shortid");
const Joi=require("joi")
const {validateSignup}=require("../SchemaValidation/signupschema")

const pool = require("../Database/db");

module.exports = async function registerUser(req, res) {
  let { email, password } = req.body;

  const {error,value}=validateSignup(req.body)

  if(error){
    return res.json({success:'falied',
     message: error.details[0].message});
  }


  const hashedPassword = await bcrypt.hash(password, 10);
  pool.query(
    `SELECT * FROM users WHERE useremail=$1`,
    [email],
    (err, results) => {
      if (err) {
        throw err;
      }
      if (results.rows.length > 0) {
        return res.status(400).json({ error: "Email already registered" });
      } else {
        pool.query(
          `
        INSERT INTO users (useremail,password) VALUES($1 ,$2) RETURNING *
          `,
          [email, hashedPassword],
          async (err, result) => {
            if (err) {
              throw err;
            } else {
              const getuserid=await pool.query(
                `SELECT * FROM users WHERE useremail = $1 `,[email]
              );
              const user_id=getuserid.rows[0].id;
                
              const result1 = await pool.query(
                "INSERT INTO user_roles  (user_id, role_id) VALUES ($1, $2) RETURNING *",
                [user_id, 2]
              );
              if (result1.rows.length > 0) {
                return res.status(201).json({
                  message: "You are now registered. Please login",
                  data: result.rows,
                });
              }
            }
          }
        );
      }
    }
  );
};
