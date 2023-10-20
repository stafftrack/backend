import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yekrygkccujzdoirdlmv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlla3J5Z2tjY3VqemRvaXJkbG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM2MTg4NDcsImV4cCI6MjAwOTE5NDg0N30.ei-S5uT97lxsfqMcQWdSwpDx5rslrPyTRbjsYoNOj3Q';

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

/*
const { error } = await supabase
.from('test')
.insert({ 
  EmpId: "fff", 
  EmpShift: "7:30", 
  DeptId: "jjjj",
  Zone: "aa",
  ToolScanTime: 2.5,
  date: "01-01-2023",
  time: "9:30",
  Img: "hji",
})
console.log(error)

const { data, error } = await supabase
  .from('Entry Data')
  .select('EmpId')

console.log(data)
*/
