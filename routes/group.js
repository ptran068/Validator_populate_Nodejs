import { Router } from 'express';
import GroupController from '../controllers/group';
import Validate from 'express-validation';
import { createGroup, updateGroup} from '../validator/group.js'
import Joi from 'joi';

const GroupControllers = new GroupController();
const router = new Router();



router.post('/groups', [ Validate(createGroup) ], GroupControllers.createGroup);
router.get('/groups', GroupControllers.getAll);
router.put('/groups/:id', [ Validate(updateGroup) ], GroupControllers.updateGroup);
router.delete('/groups/:id', GroupControllers.deleteGroup);


export default router;