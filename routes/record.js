import express from 'express'
import { authorization } from '../middlewares/auth.js';
import { rolecheckservice } from '../middlewares/role_check.js';
import { showRecord, createRecord, deleteRecord, updateRecord } from '../controller/record_controller.js';
import { authorize } from '../middlewares/authorize.js';
import { Permission } from '../config/roles.js';

const router = express.Router();



// router.post('/',authservice, async (req, res) => {
//     try {
//         const recorddata = req.body;
//         const validaterecord = record.parse(recorddata);
//         const result = await recordmodel.create(validaterecord)
//         return res.status(201).json({ message: "Record Create Successfully", data: result });
//     } catch (err) {
//         console.log(err)
//         if (err.name === "ZodError") {
//             return res.status(400).json({ message: "data is not in valid form" })
//         }
//         return res.status(500).json({ message: "Internal Server Error!" })
//     }
// })

// router.post('/create',authservice,rolecheckservice,async(req,res)=>{
//    try {
//         const recorddata = req.body;
//         const validaterecord = record.parse(recorddata);
//         const result = await recordmodel.create(validaterecord)
//         return res.status(201).json({ message: "Record Create Successfully", data: result._id });
//     } catch (err) {
//         console.log(err)
//         if (err.name === "ZodError") {
//             return res.status(400).json({ message: "data is not in valid form" })
//         }
//         return res.status(500).json({ message: "Internal Server Error!" })
//     }
// })

router.get('/all', authorization, rolecheckservice, authorize(Permission.SHOW_RECORD), showRecord)

router.post('/create', authorization,rolecheckservice, authorize(Permission.CREATE_RECORD), createRecord)

router.delete('/delete/:id',authorization, rolecheckservice, authorize(Permission.DELETE_RECORD), deleteRecord)

router.patch('/update/:id',authorization, rolecheckservice, authorize(Permission.UPDATE_RECORD), updateRecord);

export default router;