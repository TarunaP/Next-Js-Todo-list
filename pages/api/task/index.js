import dbConnect from '../dbConnect';
import  Task from '../Model/Task';

export default async (req, res) => {
    const { method } = req;

    // Connect to database
    await dbConnect();

    // Create task
    if (method === "POST") {
        try {
            const newTask = await new Task(req.body).save();
            res
                .status(200)
                .json({ data: newTask, message: "Task added successfully" });
        } catch (error) {
            res.status(401).json({ message: " Error" });
            console.log(error);
        }
    }

    //Get task
    if (method === "GET") {
        try {
            const tasks = await Task.find();
            res.status(200).json({ data: tasks });
        } catch (error) {
            res.status(401).json({ message: "Error" });
            console.log(error);
        }
    }
};
