const pool = require("../db");

module.exports = async function adminDeleteUrl(req, res) {
  const { email } = req.params;
  console.log(email);
  const email1 = req.user.useremail;
  const result2 = await pool.query(
    `SELECT * FROM permission WHERE useremail = $1`,
    [email1]
  );
  if (result2.rows.length > 0 && result2.rows[0].role === "admin") {
    const result = await pool.query(
      "DELETE FROM users WHERE useremail = $1 RETURNING *",
      [email]
    );
    const result1 = await pool.query(
      "DELETE FROM permission WHERE useremail = $1 RETURNING *",
      [email]
    );
    if (result.rows.length > 0 && result1.rows.length > 0) {
      return res.json({
        success: true,
        message: "User deleted successfully.",
      });
    } else {
      return res.status(404).json({ error: "user not found." });
    }
  } else {
    return res
      .status(404)
      .json({ error: "You don't have permission to delete user" });
  }
};
