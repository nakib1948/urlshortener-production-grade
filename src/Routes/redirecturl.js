const pool = require("../Database/db");

module.exports = async function redirecturl(req, res) {
  const shortUrl = req.params.shortUrl;
  pool.query(
    `SELECT longurl FROM url WHERE shorturl = $1`,
    [shortUrl],
    (err, results) => {
      if (err) throw err;

      if (results.rows.length > 0) {
        const originalUrl = results.rows[0].longurl;
        res.redirect(originalUrl);
      } else {
        res.status(404).send("Short URL not found");
      }
    }
  );
};
