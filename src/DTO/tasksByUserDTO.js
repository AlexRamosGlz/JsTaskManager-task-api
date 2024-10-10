/**
 * 
 * @param {*} task 
 * @returns 
 */
export const tasksByUserDTO = (task) => {
    return {
        username: task[0].username ?? '',
        tasks: mapTasks(task) ?? []
    }
}

/**
 * 
 * @param {*} tasks 
 * @returns 
 */
export const mapTasks = (tasks) => {
    return tasks.map((task) => {
        const {username, ...task } = task;
        return task;
    })
}