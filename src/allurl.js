const pool = require("../db");

module.exports = async function allurl(req, res) {
    pool.query('SELECT * FROM url', (err, result) => {
        
        const allData= result.rows.map(({ originalurl, shorturl }) => ({ originalurl, shorturl }));
        res.send(allData)
      });

};
