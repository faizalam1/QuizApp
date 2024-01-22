import { Schema, model, models } from "mongoose";

const userQuizScoreSchema = new Schema({
    courseID: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "Course ID is required!"],
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required!"],
    },
    scores: {
        type: [Number],
        default: []
    }
});

const userQuizScore = models.userQuizScore || model("userQuizScore", userQuizScoreSchema);
export default userQuizScore;