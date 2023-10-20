import express from 'express'
const app = express();
import router from './api/router.js'

const port = 3000;

app.use(express.json());
app.use("/static",express.static("./static"));

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
