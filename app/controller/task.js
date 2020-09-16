const { Task, validate } = require('../model/Task');

module.exports.create = async (req, res) => {
    const result = validate(req.body);
    if (result.error) {
        res.status(400).json({ message: result.error.details[0].message });
    }
    const createTask = await Task.create({
        name: req.body.name,
    });
    createTask.save();
    return res.json({ task: createTask });

}

module.exports.getAll = async (req, res) => {

    const tasks = await Task.find({});
    if (!tasks) {
        res.json({ message: "task Not found" });
    }
    return res.json({ tasks: tasks });
}






