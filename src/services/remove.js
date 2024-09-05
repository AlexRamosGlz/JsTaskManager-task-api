import { response, commonsConstants, successCodes, clientErrorCodes, awsRequestId, tasksConstants} from 'JsTaskManager-commons-layer'
import { tasksQueries, Mysql } from 'JsTaskManager-mysql-layer';
import { taskToDTO } from '../DTO/taskToDTO';

export const remove = async (req, res) => {
    try {
        const { taskId } = req.body; 

        const task = await Mysql.execute(tasksQueries.getById, taskId);

        if(!task) {
            console.error(`${tasksConstants.baseLog}${commonsConstants.DELETE} ${commonsConstants.ERROR} ${tasksConstants.TASKS_NOT_FOUND}`);
            throw new Error(tasksConstants.TASKS_NOT_FOUND);
        }

        await Mysql.execute(tasksQueries.remove, taskId);

        const taskDTO = taskToDTO(task);

        response.success(res, req.awsRequestId, taskDTO, tasksConstants.TASK_DELETED, successCodes.OK);
    }catch(error) {
        console.error(`${tasksConstants.baseLog}${commonsConstants.LIST} ${commonsConstants.ERROR} ${error}`);
        response.error(res, req.awsRequestId, error, tasksConstants.TASK_NOT_DELETED, clientErrorCodes.NOT_FOUND);
    }
}