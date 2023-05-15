const pool = require("../Database/db");

module.exports = async function adminDeleteUrl(req, res) {
  const { email } = req.params;
  //console.log(email);
 
  const userid = req.user.id;
 // console.log(userid)

  const getdeleteUserid = await pool.query(
    `SELECT * FROM  users WHERE useremail = $1`,
    [email]
  );

  if (getdeleteUserid.rows.length > 0) {
    const deleteuserid = getdeleteUserid.rows[0].id;
   // console.log(deleteuserid)
    const result2 = await pool.query(
      `SELECT * FROM  user_roles WHERE user_id = $1`,
      [userid]
    );
   // console.log(result2.rows[0].user_id)
    if (result2.rows.length > 0 && result2.rows[0].role_id == 1) {
      const result1 = await pool.query(
        "DELETE FROM user_roles WHERE user_id = $1 RETURNING *",
        [deleteuserid]
      );
      const result = await pool.query(
        "DELETE FROM users WHERE useremail = $1 RETURNING *",
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
  } else {
    return res.status(404).json({ error: "user doesn't exist" });
  }
};
