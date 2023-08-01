import Task from "../models/tasks.models.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate("user");
    res.json(tasks)
}

export const createTasks = async (req, res) => {
    const { title, description, date } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id
        })

        const saveTask = await newTask.save();

        res.json({
            title: saveTask.title,
            description: saveTask.description,
            date: saveTask.date,
            user: saveTask.user,
            createdAt: saveTask.createdAt,
            updatedAt: saveTask.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("user");
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        } else {
            res.json(task);
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const deleteTasks = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        })
    } else return res.sendStatus(204);
}

export const updateTasks = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        })
    } else res.json(task)
}

