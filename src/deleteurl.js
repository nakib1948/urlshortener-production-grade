const pool = require("../db");

module.exports = async function deleteurl(req, res) {
  const { shorturl } = req.params;
  const userEmail = req.user.email;

  const result = await pool.query("SELECT * FROM url WHERE shorturl = $1", [
    shorturl,
  ]);

  if (result.rows.length > 0) {
    const id = result.rows[0].userid;
    const result1 = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND email = $2",
      [id, userEmail]
    );

    if (result1.rows.length > 0) {
      const result = await pool.query(
        "DELETE FROM url WHERE shorturl = $1 RETURNING *",
        [shorturl]
      );
      if (result.rows.length > 0) {
        return res.json({
          success: true,
          message: "Short URL deleted successfully.",
        });
      } else {
        return res.status(404).json({ error: "Short URL not found." });
      }
    } else
      res.status(404).json({ error: "Short URL not found.", message: "ok" });
  } else res.status(404).json({ error: "Short URL not found.", message: "ok" });
};
