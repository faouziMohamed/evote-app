import bcrypt from 'bcrypt';
import { startCase, toLower } from 'lodash';
import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'User name is required'],
      maxLength: [50, 'User name must be less than 50 characters, got {VALUE}'],
      default: '',
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Password is required and must be at last 8 caracters'],
      minLength: [8, 'Password must be at least 8 characters'],
      select: false,
      default: '',
    },
    name: {
      first: {
        type: String,
        required: true,
        default: '',
        minLength: [2, 'First name must be at least 2 characters'],
        maxLength: [100, 'First name must be less than 100 characters'],
      },
      last: {
        type: String,
        required: true,
        default: '',
        minLength: [2, 'Last name must be at least 2 characters'],
        maxLength: [100, 'Last name must be less than 100 characters'],
      },
    },
    cin: {
      type: Number,
      required: [true, 'CIN is required but nothing was specified'],
      unique: true,
    },
    activationOrderNo: { type: Number, min: 0, default: 0 },
    activationDate: { type: Date, default: Date.now },
    userType: { type: String, default: 'voter' },
    role: { type: String, default: 'user' },
    lang: { type: String, enum: ['fr', 'en'], default: 'en' },
    birthDate: { type: Date, required: true, default: '' },
    isFirstLogin: { type: Boolean, default: true },
    isPdg: { type: Boolean, default: false },
    hasVoted: { type: Boolean, default: false },
    isActivated: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
  },
  { timeStamp: true },
);

userSchema.index({ username: 1, email: 1, cin: 1 }, { unique: true });

function hashUserPassword(next, user) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(err);
      return;
    }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        next(error);
        return;
      }
      user.set({ password: hash });
      next();
    });
  });
}

// Everytime a user is saved or the password is hashed
userSchema.pre('save', function setPasswordHash(next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
    return;
  }
  hashUserPassword(next, user);
});

userSchema.pre('save', async function lowerCaseEmail(next) {
  const user = this;
  const { email } = user;
  user.set({ email: email.toLowerCase() });
  next();
});

userSchema.pre('save', function capitaliseNames(next) {
  const user = this;
  if (user.isModified('name')) {
    user.name.first = startCase(toLower(user.name.first));
    user.name.last = startCase(toLower(user.name.last));
  }
  next();
});

userSchema.pre('save', function lowercaseusername(next) {
  const user = this;
  if (user.isModified('username')) {
    user.username.toLowerCase();
  }
  next();
});

userSchema.methods.comparePassword = async function comparePassword(password) {
  const hashedPassword = this.password;
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const User = model('User', userSchema);
export default User;
