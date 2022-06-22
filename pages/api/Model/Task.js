import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    task: {
        type: String
    }
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema); // export model
