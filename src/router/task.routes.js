import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js'
import {getTasks, getTask, createTasks, updateTasks, deleteTasks} from '../controllers/tasks.controllers.js'
import { validateSchema } from "../middlewares/validator.js";
import { createTaskShema } from "../schemas/tasks.schemas.js";

const router = Router();

router.get('/tasks', authRequired, getTasks)

router.get('/tasks/:id', authRequired, getTask)

router.post('/tasks', authRequired, validateSchema(createTaskShema),createTasks)

router.delete('/tasks/:id', authRequired, deleteTasks)

router.put('/tasks/:id', authRequired, updateTasks)


export default router