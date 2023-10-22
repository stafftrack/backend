import db from '../db.js'
import sendEmail from '../utils/sendEmail.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function createEntry(req, res, next) {
  const { empId, shift, deptId, zone, date, arrived_time } = JSON.parse(req.body.empInfo);
  const url = req.file.path;
  console.log(url);
  console.log(empId, shift, deptId, zone, date, arrived_time);

  if (!(empId && shift && deptId && zone && date && arrived_time)) {
    return res.status(400).json({ error: "Missing Required Input" });
  }

  try {
    //Insert entry info into table
    let insertQuery = `INSERT INTO Entry
    (empID, shift, department, zone, date, arrived_time, image) 
    VALUES (?, ?, ?, ?, ? ,?, ?)`
    const parts = date.split("/");
    const new_date = `${parts[2]}-${parts[1]}-${parts[0]}`
    const params = [empId, shift, deptId, zone, new_date, arrived_time, url];
    
    await db.execute(insertQuery, params);
    console.log("hi");
    //send image to AI model

    sendEmail().text_attachments(
      "raymand0109@gmail.com",
      "TestAPI"
    )
    //
    return res.status(200).json({});

  } catch (err) {
      return res.status(500).json({ error: err });
  }
}
