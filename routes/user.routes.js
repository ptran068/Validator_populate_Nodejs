import { Router } from 'express';
import UserController from '../controllers/user';
import GroupController from '../controllers/group';
import Validate from 'express-validation';
import { createUser, updateUser } from '../validator/user.js';
import { createGroup, updateGroup} from '../validator/group.js'
import Joi from 'joi';

const GroupControllers = new GroupController();
const router = new Router();

// Get all users
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getOneUser);// req.params
router.post('/users', [ Validate(createUser) ], UserController.addUser); // req.body
router.put('/users/:id', [ Validate(updateUser)], UserController.updateUser); // req.body
router.delete('/users/:id', UserController.deleteUser);

router.post('/groups', [ Validate(createGroup) ], GroupControllers.createGroup);
router.get('/groups', GroupControllers.getAll);
router.put('/groups/:id', [ Validate(updateGroup) ], GroupControllers.updateGroup);
router.delete('/groups/:id', GroupControllers.deleteGroup);


export default router;