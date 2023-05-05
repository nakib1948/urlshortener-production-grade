const shortid = require("shortid");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db");

module.exports = async function updateurl(req, res) {
  const Url = req.body.url;

  if (!Url.includes("http://") && !Url.includes("https://")) {
    return res.json({ error: "invalid url" });
  }

  const shortId = shortid.generate();
  const id = uuidv4();

  const newUrl = await pool.query(
    "INSERT INTO url (id,originalurl,shorturl) VALUES($1 ,$2, $3) RETURNING *",
    [id, Url, shortId]
  );
  res.json({ message: `${id} ${Url} ${shortId}`, data: newUrl.rows });
};
