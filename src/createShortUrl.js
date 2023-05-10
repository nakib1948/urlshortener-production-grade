const shortid = require("shortid");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db");

module.exports = async function createShortUrl(req, res) {
  const Url = req.body.url;

  if (Url.length > 100) {
    return res
      .status(400)
      .json({ error: "URL length should be under 200 characters" });
  }

  const shortId = shortid.generate();

  if (req.isAuthenticated()) {
    const userid = req.user.id;
    const newUrl = await pool.query(
      "INSERT INTO url (shorturl,longurl,user_id) VALUES($1 ,$2, $3) RETURNING *",
      [shortId, Url, userid]
    );
    res.json({ message: `${Url} ${shortId}`, data: newUrl.rows });
  } else {
    const newUrl = await pool.query(
      "INSERT INTO url (shorturl,longurl) VALUES($1 ,$2) RETURNING *",
      [shortId, Url]
    );
    res.json({ message: `${Url} ${shortId}`, data: newUrl.rows });
  }
};
