import { response, commonsConstants, successCodes, clientErrorCodes, awsRequestId, tasksConstants} from 'JsTaskManager-commons-layer'
import { tasksQueries, Mysql } from 'JsTaskManager-mysql-layer';
import { taskToDTO } from '../DTO/taskToDTO.js';

export const update = async (req, res) => {
    try {
        const { taskId } = req.body; 

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
            assignee: req.body.assignee ?? task. assignee,
            updatedAt: new Date()
        }

        await Mysql.execute(tasksQueries.add, [
            taskToUpdate.title,
            taskToUpdate.fullDescription,
            taskToUpdate.shortDescription,
            taskToUpdate.dueTo,
            taskToUpdate.assignee,
            taskToUpdate.updatedAt
        ])

        const updatedTask = await Mysql.execute(tasksQueries.getById, taskId);

        const taskDTO = taskToDTO(updatedTask);

        response.success(res, req.awsRequestId, taskDTO, tasksConstants.TASKS_FOUND, successCodes.OK);
    }catch(error) {
        console.error(`${tasksConstants.baseLog}${commonsConstants.LIST} ${commonsConstants.ERROR} ${error}`);
        response.error(res, req.awsRequestId, error, tasksConstants.TASKS_NOT_FOUND, clientErrorCodes.NOT_FOUND);
    }
}