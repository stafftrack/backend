//import db from '../db.js'
import sendEmail from '../utils/sendEmail.js'
import sendImageToModel from '../utils/sendImage.js';
import { supabase } from '../supabase.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function createEntry(req, res, next) {
  const { empId, shift, deptId, zone, ToolScanTime, date, arrived_time } = JSON.parse(req.body.empInfo);
/*
  {
    "empId": "EMP017",
    "shift": "7:30",
    "deptId": "DEPT4",
    "zone": "AZ",
    "ToolScanTime": 2.5,
    "date": "9/11/2023", 
    "arrived_time":"7:14"
  }
*/
  const url = req.file.path;
  console.log(url);
  console.log(empId, shift, deptId, zone, date, arrived_time, ToolScanTime);

  if (!(empId && shift && deptId && zone && date && arrived_time && ToolScanTime)) {
    return res.status(400).json({ error: "Missing Required Input" });
  }

  try {
    //Insert entry info into table

    const parts = date.split("/");
    const new_date = `${parts[2]}-${parts[1]}-${parts[0]}`
    
    const { error } = await supabase
    .from('test')
    .insert({ 
      EmpId: empId, 
      EmpShift: shift, 
      DeptId: deptId,
      Zone: zone,
      ToolScanTime: ToolScanTime,
      date: new_date,
      time: arrived_time,
      Img: url,
    })
    console.log("error:", error)
    //send image to AI model
    const contraband = await sendImageToModel(url); 
    console.log(contraband)
    if( contraband ){
      const { error } = await supabase
      .from('ContrabandRecord')
      .insert({ 
        EmpId: empId, 
        date: new_date,
        contraband: contraband,
        image: url
      })
      console.log(error)
      /*
      sendEmail().text_attachments(
        "raymand0109@gmail.com",
        "TestAPI",
        "someone bring contraband"
      )
      */
    }
    //
    return res.status(200).json();

  } catch (err) {
      return res.status(500).json({ error: err });
  }
}
