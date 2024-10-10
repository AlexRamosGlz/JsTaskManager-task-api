import { response, commonsConstants, successCodes, clientErrorCodes, awsRequestId, tasksConstants} from 'JsTaskManager-commons-layer'
import { tasksQueries, Mysql, usersTasksQueries } from 'JsTaskManager-mysql-layer';
import { taskToDTO } from '../DTO/taskToDTO.js';

export const update = async (req, res) => {
    try {
        const taskId  = req.params.id; 

        const task = await Mysql.execute(tasksQueries.getById, taskId);

        if(!task) {
            console.error(`${tasksConstants.baseLog}${commonsConstants.DELETE} ${commonsConstants.ERROR} ${tasksConstants.TASKS_NOT_FOUND}`);
            throw new Error(tasksConstants.TASKS_NOT_FOUND);
        }

        const taskToUpdate = {
            title: req.body.title ?? task.title,
            fullDescription: req.body.fullDescription ?? task.fullDescription,
            shortDescription: req.body.shortDescription ?? task.shortDescription,
            dueTo: req.body.dueTo ?? task.dueTo,
            status: req.body.status ?? task.status,
            status: req.body.status ?? task.status,
            updatedAt: new Date()
        }

        await Mysql.execute(tasksQueries.update, [
            taskToUpdate.title,
            taskToUpdate.fullDescription,
            taskToUpdate.shortDescription,
            taskToUpdate.dueTo,
            taskToUpdate.status,
            taskToUpdate.updatedAt,
            taskId
        ])

        //TODO add the avility to update assignees

        const updatedTask = await Mysql.execute(usersTasksQueries.getByTaskId, taskId);

        const taskDTO = taskToDTO(updatedTask);

        response.success(res, req.awsRequestId, taskDTO, tasksConstants.TASK_UPDATED, successCodes.OK);
    }catch(error) {
        console.error(`${tasksConstants.baseLog}${commonsConstants.LIST} ${commonsConstants.ERROR} ${error}`);
        response.error(res, req.awsRequestId, error, tasksConstants.TASKS_NOT_FOUND, clientErrorCodes.NOT_FOUND);
    }
}