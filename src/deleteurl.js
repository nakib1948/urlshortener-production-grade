const pool = require("../db");

module.exports = async function deleteurl(req, res) {
  const { shorturl } = req.params;

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
};
