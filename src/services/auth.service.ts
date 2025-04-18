
import bcrypt from 'bcrypt';
import User from '../model/user.model';
import generateToken from '../utils/jwt'; // Correct import

// Register new user
export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    message: 'Registration successful',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id.toString()), // Generating JWT Token
  };
};

// Login existing user
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return {
    message: 'Login successful',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id.toString()), // Generating JWT Token
  };
};


