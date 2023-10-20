import express from 'express'
import router from './api/router.js'
import cors from "cors";
//import sendReort from './sendReport.js'


const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/static",express.static("./static"));

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
