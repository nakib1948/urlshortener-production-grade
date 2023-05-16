const pool = require("../../Database/db");
const Joi = require("joi");

module.exports = async function updateurlexpiration(req, res) {
  const getdate = req.body.date;

  const schema = Joi.object({
    date: Joi.string()
      .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.json({error: "please enter date into this format 'dd/mm/yyyy' "});
  } else {
    const userid = req.user.id;
    const { shorturl } = req.params;
    const currentDate = new Date(Date.now());
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    const futureTimestamp = currentDate.getTime();

    const dateParts = getdate.split("/");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);
    const dateObject = new Date(year, month, day);
    const timestamp = dateObject.getTime();

    if (timestamp > futureTimestamp) {
      res.json({
        error: "you can't update urlexpiration time more than one year",
      });
    } else {
      const result = await pool.query(
        "UPDATE url SET urlexpiration = $1 WHERE shorturl = $2 AND user_id = $3 RETURNING *",
        [timestamp, shorturl, userid]
      );
      if (result.rows.length > 0) {
        res.json({
          success: "urlexpiration time updated successfully",
        });
      } else {
        res.json({
          error: "shorturl not found",
        });
      }
    }
  }
};
