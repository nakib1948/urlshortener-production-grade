const pool = require("../db");
const shortid = require("shortid");
module.exports = async function updateurl(req, res) {
  const { shorturl } = req.params;
  const { newShortUrl } = req.body;
  const userid = req.user.id

  const result = await pool.query(
    "UPDATE url SET shorturl = $1 WHERE shorturl = $2 AND user_id = $3 RETURNING *",
    [newShortUrl,shorturl, userid]
  );

  if (result.rows.length > 0) {
    return res.json({
      success: true,
      message: "Short URL updated successfully.",
    });
  } else {
    return res.status(404).json({ error: "Short URL not found." });
  }
};
