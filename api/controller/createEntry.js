//import db from '../db.js'
import sendEmail from '../utils/sendEmail.js'
import sendImageToModel from '../utils/sendImage.js';
import supabase from '../supabase.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function createEntry(req, res, next) {
  try{
    const { empId, shift, deptId, zone, ToolScanTime, date, arrived_time } = JSON.parse(req.body.empInfo);
    /*
    {
      "empId": "EMP017",
      "shift": "7:30",
      "deptId": "DEPT4",
      "zone": "AZ",
      "ToolScanTime":2.5,
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

    //send image to AI model
    const contraband = await sendImageToModel(url); 
    console.log(contraband)
    if( contraband ){
      //(to_who, subject, message="Hello!", filename=null, path=null)
      sendEmail().text_attachments(
        "raymand0109@gmail.com",
        `Notification of Employee Carrying Contraband`,
        `
EmpId: ${empId}
Date: ${date}
DeptId: ${deptId}
Zone: ${zone}
Contraband category:${JSON.stringify(contraband)}
During our routine in spection, it was discovered that this employee was carrying contraband items. 
This incident poses a serious breach of our company's policies and regulations, and we believe it requires immediate attention.
        `,
        `ContrabandImage.jpg`,
        url
      )
      
    }

    //Insert entry info into table

    const parts = date.split("/");
    const new_date = `${parts[2]}-${parts[0]}-${parts[1]}`
    
    const countMiutes = (time) => {
      const t = time.split(':')
      return parseInt(t[0])*60 + parseInt(t[1]);
    }  
    const timeDifference = countMiutes(arrived_time) - countMiutes(shift);
    const status = timeDifference > 30 ? "Late" : timeDifference < -30 ? "Early" : "On Time";


    const json_data = { 
      EmpId: empId, 
      EmpShift: shift, 
      DeptId: deptId,
      Zone: zone,
      ToolScanTime: ToolScanTime,
      date: new_date,
      time: arrived_time,
      Img: url,
      status: status,
      has_contraband: contraband!==undefined && contraband!==null,
      contraband: contraband,
    }
    
    const { error } = await supabase
    .from('Entry Data')
    .insert(json_data)
    console.log("supabase -> error:", error)


    return res.status(200).json(json_data);

  } catch (err) {
      return res.status(500).json({ error: err });
  }
}
