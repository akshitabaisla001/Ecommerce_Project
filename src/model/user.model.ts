
import  { Schema, model, Document, Types } from 'mongoose';


export interface IUser extends Document {
  _id: Types.ObjectId; // Explicitly typing _id
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = model<IUser>('User', userSchema);
export default UserModel;