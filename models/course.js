import { Schema, model, models } from 'mongoose';

const CourseSchema = new Schema({
    id: {
        type: String,
        required: [true, 'Course ID is required!'],
        unique: [true, 'Course ID already exists!'],
        match: [/^[a-zA-Z0-9-]+$/, "Course ID invalid, it should contain alphanumeric characters and hyphens!"]
    },
    name: {
        type: String,
        required: [true, 'Course name is required!'],
        unique: [true, 'Course name already exists!'],
        match: [/^[a-zA-Z0-9 ]+$/, "Course name invalid, it should contain alphanumeric characters and spaces!"]
    },
    description: {
        type: String,
        default: ""
    },
    organization: {
        type: String,
        required: [true, 'Organization is required!'],
        match: [/^[a-zA-Z0-9 ]+$/, "Organization invalid, it should contain alphanumeric characters and spaces!"]
    },
    tags: {
        type: [String],
        default: []
    },
    examPrice: {
        type: Number,
        default: 0
    },
    examDuration: {
        type: Number,
        default: 0
    },
    examQuestions: {
        type: Number,
        default: 0
    },
    examPassingPercentage: {
        type: Number,
        default: 70
    },
    examLink: {
        type: String,
        default: ""
    },
    isTestAvailable: {
        type: Boolean,
        default: false
    },
});

const Course = models.Course || model("Course", CourseSchema);

export default Course;