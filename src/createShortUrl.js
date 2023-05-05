const shortid = require("shortid");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db");

module.exports = async function createShortUrl(req, res) {
  const Url = req.body.url;

  const shortId = shortid.generate();
  const shortId1 = shortid.generate();

  if (req.isAuthenticated()) {
    const userEmail = req.user.email;
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [userEmail],
      async (err, results) => {
        if (err) throw err;
        //  console.log(results.rows);
        if (results.rows.length > 0) {
          const id = results.rows[0].id;
          const newUrl = await pool.query(
            "INSERT INTO url (userid,originalurl,shorturl) VALUES($1 ,$2, $3) RETURNING *",
            [id, Url, shortId]
          );
          res.json({ message: `${id} ${Url} ${shortId}`, data: newUrl.rows });
        }
      }
    );
  } else {
    const newUrl = await pool.query(
      "INSERT INTO url (userid,originalurl,shorturl) VALUES($1 ,$2, $3) RETURNING *",
      [shortId1, Url, shortId]
    );
    res.json({ message: `${shortId1} ${Url} ${shortId}`, data: newUrl.rows });
  }
};
