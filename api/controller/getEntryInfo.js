import db from '../db.js'
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function getEntryInfo(req, res, next) {
  try{
    const { empId, startDate, endDate, deptId, status } = req.query

    let filterQuery = 'SELECT * FROM Entry e LEFT JOIN ContrabandRecord c on e.empID=c.empID AND e.date=c.date WHERE 1=1';
    const params = [];

    if (empId) {
      filterQuery += ' AND empID = ?';
      params.push(empId);
    }
    if (startDate) {
      filterQuery += ' AND date >= ?';
      params.push(startDate);
    }
    if (endDate) {
      filterQuery += ' AND date <= ?';
      params.push(endDate);
    }
    if (deptId) {
      filterQuery += ' AND department = ?';
      params.push(deptId);
    }
    if (status !== null) {
      filterQuery += ' AND is_late = ?';
      params.push(status === "Late");
    }

    const [rows] = await db.execute(filterQuery, params);

    // 返回查询结果
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
