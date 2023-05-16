const pool = require("../../Database/db");

module.exports=async function checkExpiredUrls (req,res) {
    const currentTime = Date.now();
  
    const result = await pool.query(
        "DELETE FROM url WHERE urlexpiration < $1",
        [currentTime]
      );
   
  };
  