import supabase from "./api/supabase.js";
import openaiAPI from "./openai.js";
import sendEmail from "./api/utils/sendEmail.js";
import { Parser } from 'json2csv';
import cron from 'node-cron'
import pdfPrinter from "pdfmake";
import fs from 'fs'

function producePDF(docDefinition, filename){
  var fonts = {
    Roboto: {
      normal: 'Roboto/Roboto-Regular.ttf',
      bold: 'Roboto/Roboto-Medium.ttf',
      italics: 'Roboto/Roboto-Italic.ttf',
      bolditalics: 'Roboto/Roboto-MediumItalic.ttf'
    }
  };
  
  var printer = new pdfPrinter(fonts);
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(filename));
  pdfDoc.end();
}

function jsonToCSV(fields, jsonData){
  const json2csvParser = new Parser({ fields });
  const csvData = json2csvParser.parse(jsonData);
  return csvData;
}

function csvTo2Darray(csvData) {
  const rows = csvData.split("\n");
  const table = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].split(",");
    table.push(row);
  }
  return table;
}

async function produceReport(startDateOfWeek, endDateOfWeek, filename){
  const { data, error } = await supabase
  .from('Entry Data')
  .select(`
        EmpId, 
        DeptId,
        Zone,
        date,
        status,
        has_contraband
        `)
  .lte('date', endDateOfWeek.toLocaleDateString())
  .gte('date', startDateOfWeek.toLocaleDateString())
  .eq('Zone','HQ')
  .in('status', ['Late', 'Early'])
  .order('date', { ascending: false });

  const fields = ['EmpId', 'DeptId', 'Zone', 'date', 'status', 'has_contraband'];
  const tableBody = csvTo2Darray(jsonToCSV(fields, data));
  const docDefinition = {
    content: [
      {text: 'Weekly Report', style: 'header'},
      {
        table: {
          body: tableBody,
        },
      },
    ],
  };
  producePDF(docDefinition, filename)
}

async function getInfoFromGPT(endDateOfWeek){
  try{
    let content = 
    `Please analyze the data and summarize for weekly report. \n"""\n`

    for( let i = 0; i < 7; i++){
      let dateOfWeek = new Date(endDateOfWeek)
      dateOfWeek.setDate(dateOfWeek.getDate() - i);
      const { data, error } = await supabase
      .from('Entry Data')
      .select(`
            EmpId, 
            DeptId,
            Zone,
            status,
            has_contraband
            `)
      .eq('date', dateOfWeek.toLocaleDateString())
      .in('status', ['Late', 'Early']);
      console.log("supabase -> error:", error);
      const fields = ['EmpId', 'DeptId', 'Zone', 'status', 'has_contraband'];
      const csvData = jsonToCSV(fields, data);
      const date_content = `Date: ${dateOfWeek.toLocaleDateString()}\n${csvData}\n`;
      content += date_content;
    }
    content = content + `"""`

    //const textFromAI = await openaiAPI(content);
    const textFromAI = "test"
    console.log(textFromAI);
    return textFromAI;
  }catch(error){
      console.log(error)
  }
}

const filename = 'report.pdf';
const today = new Date("2023-09-22");
const endDateOfWeek = new Date(today);
endDateOfWeek.setDate(endDateOfWeek.getDate()-1);
const startDateOfWeek = new Date(endDateOfWeek); 
startDateOfWeek.setDate(endDateOfWeek.getDate() - 6); 
console.log(startDateOfWeek.toLocaleDateString());
  
cron.schedule('*/5 * * * *', async () => {
  try{
    await produceReport(startDateOfWeek, endDateOfWeek, filename);
    const text = await getInfoFromGPT(endDateOfWeek);
      sendEmail().text_attachments(
      "dylan920901@gmail.com", 
      "Weekly Report",
      text,
      filename,
      "report.pdf")
      console.log('running a task every minute');
  }catch(err){
    console.log(err);
  }
});

export default ()=>{
    console.log("Run sendReport.js")
}

