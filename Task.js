import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Task text is required'],
    trim: true,
    minlength: [3, 'Min 3 characters'],
    maxlength: [255, 'Max 255 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: false, updatedAt: 'lastModified' }
});

// Indexes
taskSchema.index({ text: 'text' });
taskSchema.index({ completed: 1 });

const Task = mongoose.model('Task', taskSchema);
export default Task;
