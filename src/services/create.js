import { response, commonsConstants, successCodes, clientErrorCodes, awsRequestId, tasksConstants} from 'JsTaskManager-commons-layer'
import { tasksQueries, Mysql, Tasks, usersTasksQueries, usersQueries} from 'JsTaskManager-mysql-layer';
import { taskToDTO } from '../DTO/taskToDTO.js';

export const create = async (req, res) => {
    try {
        const taskBody = {
            title: req.body.title,
            fullDescription: req.body.fullDescription,
            shortDescription: req.body.shortDescription,
            dueTo: req.body.dueTo,
            status: req.body.status
        }

        const newTask = Tasks.createEntity(taskBody);

        await Mysql.execute(tasksQueries.add, [
            newTask.id,
            newTask.title,
            newTask.fullDescription,
            newTask.shortDescription,
            newTask.dueTo,
            newTask.status,
            newTask.createdAt,
            newTask.updatedAt
        ])
        await Mysql.execute(tasksQueries.add, [
            newTask.id,
            newTask.title,
            newTask.fullDescription,
            newTask.shortDescription,
            newTask.dueTo,
            newTask.status,
            newTask.createdAt,
            newTask.updatedAt
        ])

        //TODO test tasksToMap, once DB is up 
        const taskMaped = tasksToMap(req.body.assignees, newTask);
        
        await Mysql.execute(usersTasksQueries.add(taskMaped));

        const task  = await Mysql.execute(usersTasksQueries.getByTaskId, newTask.id);        

        const taskDTO = taskToDTO(task);

        response.success(res, req.awsRequestId, taskDTO, tasksConstants.TASK_CREATED, successCodes.CREATED);
    }catch(error) {
        console.error(`${tasksConstants.baseLog}${commonsConstants.LIST} ${commonsConstants.ERROR} ${error}`);
        response.error(res, req.awsRequestId, error, tasksConstants.TASK_NOT_CREATED, clientErrorCodes.BAD_REQUEST);
    }
}

const tasksToMap = async (users, tasks) => {
    return await Promise.all(
        users.map(async (user) => {
            const [userId] =  await Mysql.execute(usersQueries.getIdByUserName, user);
        return `('${userId.id}', '${tasks.id}')`
        })
    )
}