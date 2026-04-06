import express from 'express'
import { createUser,deleteuser,updaterole,statuschange, Allusers } from '../controller/user_controller.js';
import { authorization } from '../middlewares/auth.js';
import { rolecheckservice } from '../middlewares/role_check.js';
import { authorize } from '../middlewares/authorize.js';
import { Permission } from '../config/roles.js';

const Guard = [authorization,rolecheckservice];
const router = express.Router();
//router.post('/create',Guard,authorize(Permission.CREATE_USER),createUser);
router.post('/create',createUser);

router.patch('/updaterole/:id',Guard,authorize(Permission.CHANGE_ROLE),updaterole);

router.delete('/delete/:id',Guard,authorize(Permission.DELETE_USER),deleteuser);

router.patch('/status/:id',Guard,authorize(Permission.CHANGE_STATUS),statuschange);

router.get('/allusers',Guard,authorize(Permission.ALL_USER),Allusers);



export default router;