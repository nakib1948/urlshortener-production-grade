const pool = require("../Database/db");

module.exports = async function adminDeleteUrl(req, res) {
  const { shorturl } = req.params;
  const userid = req.user.id;

  const result1 = await pool.query(
    `SELECT * FROM  user_roles WHERE user_id = $1`,
    [userid]
  );
  if (result1.rows.length > 0 && result1.rows[0].role_id === 1) {
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
  } else {
    return res
      .status(404)
      .json({ error: "You don't have permission to delete url" });
  }
};
