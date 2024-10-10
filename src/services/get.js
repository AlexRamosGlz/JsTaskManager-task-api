import { response, commonsConstants, successCodes, clientErrorCodes, awsRequestId, tasksConstants} from 'JsTaskManager-commons-layer'
import { tasksQueries, Mysql, usersTasksQueries } from 'JsTaskManager-mysql-layer';
import { taskToDTO } from '../DTO/taskToDTO.js';

export const getTaskById = async (req, res) => {
    try {
        const taskId  = req.params.id;

        let task = await Mysql.execute(usersTasksQueries.getByTaskId, taskId);

        if(!task) {
            console.error(`${tasksConstants.baseLog}${commonsConstants.DELETE} ${commonsConstants.ERROR} ${tasksConstants.TASKS_NOT_FOUND}`);
            throw new Error(tasksConstants.TASKS_NOT_FOUND);
        }

        const taskDTO = taskToDTO(task);

        response.success(res, req.awsRequestId, taskDTO, tasksConstants.TASKS_FOUND, successCodes.OK);
    }catch(error) {
        console.error(`${tasksConstants.baseLog}${commonsConstants.LIST} ${commonsConstants.ERROR} ${error}`);
        response.error(res, req.awsRequestId, error, tasksConstants.TASKS_NOT_FOUND, clientErrorCodes.NOT_FOUND);
    }
}

// TODO implement below function
export const getUsersTaskByUserId = async () => {

}