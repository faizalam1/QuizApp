import { Schema, model, models } from "mongoose";

const questionSchema = new Schema({
    courseID: {
        type: String,
        ref: "Course",
        required: [true, "Course ID is required!"],
    },
    question: {
        type: String,
        required: [true, "Question is required!"]
    },
    questionType: {
        type: String,
        enum: ["Single", "Multiple", "True/False", "Dropdown"],
        required: [true, "Question type is required!"],
    },
    options: {
        type: [
            {
                option: {
                    type: Schema.Types.Mixed,
                    required: [true, "Option is required!"],
                },
                isCorrect: {
                    type: Schema.Types.Mixed,
                    required: [true, "isCorrect is required!"],
                },
            },
        ],
        required: [true, "Options are required!"],
    }

});

const question = models.question || model("question", questionSchema);
export default question;