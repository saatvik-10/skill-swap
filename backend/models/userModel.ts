import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    location: {
      type: String,
    },
    skillsOffered: [
      {
        type: String,
        required: true,
      },
    ],
    skillsWanted: [
      {
        type: String,
        required: true,
      },
    ],
    public: {
      type: Boolean,
      default: false,
    },
    availability: {
      Monday: {
        type: Boolean,
        default: false,
      },
      Tuesday: {
        type: Boolean,
        default: false,
      },
      Wednesday: {
        type: Boolean,
        default: false,
      },
      Thursday: {
        type: Boolean,
        default: false,
      },
      Friday: {
        type: Boolean,
        default: false,
      },
      Saturday: {
        type: Boolean,
        default: false,
      },
      Sunday: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true },
);

const Users = mongoose.model("User", userSchema);
export default Users;

