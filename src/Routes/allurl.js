const pool = require("../Database/db");

module.exports = async function allurl(req, res) {
  if (req.isAuthenticated()) {
    const userid = req.user.id;
    console.log(userid);
  }
  pool.query("SELECT * FROM url", (err, result) => {
    const allData = result.rows.map(({ originalurl, shorturl }) => ({
      originalurl,
      shorturl,
    }));
    res.send(allData);
  });
};
