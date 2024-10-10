import { response, commonsConstants, successCodes, clientErrorCodes, awsRequestId, tasksConstants} from 'JsTaskManager-commons-layer'
import { tasksQueries, Mysql, usersTasksQueries} from 'JsTaskManager-mysql-layer';
import { taskToDTO } from '../DTO/taskToDTO.js';

export const remove = async (req, res) => {
    try {
        const taskId  = req.params.id; 

        let task = await Mysql.execute(tasksQueries.getById, taskId);

        if(!task) {
            console.error(`${tasksConstants.baseLog}${commonsConstants.DELETE} ${commonsConstants.ERROR} ${tasksConstants.TASKS_NOT_FOUND}`);
            throw new Error(tasksConstants.TASKS_NOT_FOUND);
        }
        
        task  = await Mysql.execute(usersTasksQueries.getByTaskId, taskId); 
        
        await Mysql.execute(tasksQueries.remove, taskId);

        const taskDTO = taskToDTO(task);

        response.success(res, req.awsRequestId, taskDTO, tasksConstants.TASK_DELETED, successCodes.OK);
    }catch(error) {
        console.error(`${tasksConstants.baseLog}${commonsConstants.LIST} ${commonsConstants.ERROR} ${error}`);
        response.error(res, req.awsRequestId, error, tasksConstants.TASK_NOT_DELETED, clientErrorCodes.NOT_FOUND);
    }
}