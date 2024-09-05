
/**
 * 
 * @param {*} task 
 */
export const taskToDTO = (task) => {
    return {
        id: task.id ?? '',
        title: task.title ?? '',
        fullDescription: task.fullDescription ?? '',
        shortDescription: task.shortDescription ?? '',
        dueTo: task.dueTo ?? new Date(),
        assignee: task.assignee ?? '',
    }
}