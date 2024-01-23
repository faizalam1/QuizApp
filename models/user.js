import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email invalid!"]
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    unique: [true, 'Username already exists!'],
    match: [/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 3-20 alphanumeric letters!"]
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/, "Password invalid, it should contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be 8-20 characters long!"]
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
}
);

const User = models.User || model("User", UserSchema);

export default User;