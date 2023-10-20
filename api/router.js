import { Router } from 'express'
import picUploader from './utils/uploadPicture.js'
import createEntry from './controller/createEntry.js'
//import getEntryInfo from './controller'
//import getContrabandRecord from './controller'

const router = Router();

router.get('/test', (req, res) => {
    res.status(200).json({
        test:"hello"
    })
})
router.post('/entry', picUploader.single('image'), createEntry);
//router.get('/entry', getEntryInfo);
//router.get('/security', getContrabandRecord);

export default router;