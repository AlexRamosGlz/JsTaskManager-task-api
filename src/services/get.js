import { response, commonsConstants, successCodes, clientErrorCodes, awsRequestId, tasksConstants} from 'JsTaskManager-commons-layer'
import { tasksQueries, Mysql } from 'JsTaskManager-mysql-layer';
import { taskToDTO } from '../DTO/taskToDTO';

export const getById = async (req, res) => {
    try {
        const { taskId } = req.body; 

        const task = await Mysql.execute(tasksQueries.getById, taskId);

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