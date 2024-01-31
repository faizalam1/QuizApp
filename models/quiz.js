import { Schema, model, models } from "mongoose";

const quizSchema = new Schema({
    courseID: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "Course ID is required!"],
    },
    question: {
        type:
        {
            question: {
                type: String,
                required: [true, "Question is required!"],
            },
            questionType: {
                type: String,
                enum: ["single", "multiple"],
                required: [true, "Question type is required!"],
            },
            options: {
                type: [
                    {
                        option: {
                            type: String,
                            required: [true, "Option is required!"],
                        },
                        isCorrect: {
                            type: Boolean,
                            required: [true, "isCorrect is required!"],
                        },
                    },
                ],
                required: [true, "Options are required!"],
            },
        }
        ,
        required: [true, "Question is required!"],

    }
});

const quiz = models.quiz || model("quiz", quizSchema);
export default quiz;