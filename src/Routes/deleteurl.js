const pool = require("../Database/db");

module.exports = async function deleteurl(req, res) {
  const { shorturl } = req.params;
  const userid = req.user.id;
  const result = await pool.query(
    "DELETE FROM url WHERE shorturl = $1 AND user_id = $2 RETURNING *",
    [shorturl, userid]
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
