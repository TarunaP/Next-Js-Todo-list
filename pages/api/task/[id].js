import Task from '../Model/Task';
import dbConnect from "../dbConnect";

export default async (req, res) => {
    const { method } = req;
    const { id } = req.query;

    // Connect to database
    await dbConnect();

    //Update task by Id
    if (method === "PUT") {
        try {
            const result = await Task.findByIdAndUpdate(
                id,
                { $set: req.body },
                { new: true }
            );

            res.status(200).json({ data: result, message: "Task Updated Successfully" });
        } catch (error) {
            res.status(401).json({ message: " Error" });
            console.log(error);
        }
    }

    //Delete task by Id
    if (method === "DELETE") {
        try {
            await Task.findByIdAndDelete(id);
            res.status(200).json({ message: "Task Deleted Successfully" });
        } catch (error) {
            res.status(401).json({ message: " Error" });
            console.log(error);
        }
    }
};
