
/**
 * 
 * @param {*} task 
 */
export const taskToDTO = (task) => {
    return {
        id: task[0].id ?? '',
        title: task[0].title ?? '',
        fullDescription: task[0].fullDescription ?? '',
        shortDescription: task[0].shortDescription ?? '',
        dueTo: task[0].dueTo ?? new Date(),
        "assignee(s)": mapAssignees(task) ?? [],
    }
}

/**
 * 
 * @param {*} tasks
 */
const mapAssignees = (tasks) => {
    return tasks.map((task) => {
        return task.username
    })
}

