import { config } from "dotenv";
config();
import { createPool } from "mysql2/promise";

const db = createPool({
	host: '127.0.0.1',
    port: 3300,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

const test = async () => {
try {
        const [rows, fields] = await db.execute("SELECT 1");
        console.log(rows);
        //console.log("hi");
    } catch (error) {
        console.error(error);
    }
};
test()
export default db;
