import { response, commonsConstants, successCodes, clientErrorCodes, awsRequestId, tasksConstants} from 'JsTaskManager-commons-layer'
import { tasksQueries, Mysql } from 'JsTaskManager-mysql-layer';

export const list = async (req, res) => {
    try {
        const tasks = await Mysql.execute(tasksQueries.list);

        response.success(res, req.awsRequestId, tasks, tasksConstants.TASKS_FOUND, successCodes.OK);
    }catch(error) {
        console.error(`${tasksConstants.baseLog}${commonsConstants.LIST} ${commonsConstants.ERROR} ${error}`);
        response.error(res, req.awsRequestId, error, tasksConstants.TASKS_NOT_FOUND, clientErrorCodes.NOT_FOUND);
    }
}