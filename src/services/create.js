import { response, commonsConstants, successCodes, clientErrorCodes, awsRequestId, tasksConstants} from 'JsTaskManager-commons-layer'
import { tasksQueries, Mysql, Tasks} from 'JsTaskManager-mysql-layer';
import { taskToDTO } from '../DTO/taskToDTO';

export const getById = async (req, res) => {
    try {
        const taskBody = {
            title: req.body.title,
            fullDescription: req.body.fullDescription,
            shortDescription: req.body.shortDescription,
            dueTo: req.body.dueTo,
            assignee: req.body.assignee
        }

        const newTask = Tasks.createEntity(taskBody);

        await Mysql.execute(tasksQueries.add, [
            newTask.id,
            newTask.title,
            newTask.fullDescription,
            newTask.shortDescription,
            newTask.dueTo,
            newTask.assignee,
            newTask.createdAt,
            newTask.updatedAt
        ])

        const taskDTO = taskToDTO(newTask);

        response.success(res, req.awsRequestId, taskDTO, tasksConstants.TASK_CREATED, successCodes.CREATED);
    }catch(error) {
        console.error(`${tasksConstants.baseLog}${commonsConstants.LIST} ${commonsConstants.ERROR} ${error}`);
        response.error(res, req.awsRequestId, error, tasksConstants.TASK_NOT_CREATED, clientErrorCodes.BAD_REQUEST);
    }
}