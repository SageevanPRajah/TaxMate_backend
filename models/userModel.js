import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: { 
        type: String,
    },
    lastName: { 
        type: String, 
    },
    email: { 
        type: String, 
        unique: true, 
    },
    profilePicture: { 
        type: String, 
        default: "" 
    }, // Optional
    dateOfBirth: { 
        type: Date, 
    },
    role: { 
        type: String, 
        enum: ["admin", "taxpayer","superAdmin"], 
        default: "taxpayer" 
    },
    hashed_password: { 
        type: String, 
        required: true 
    },
  },
  { 
    timestamps: true 
}
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("hashed_password")) return next(); // Prevent double hashing
    const salt = await bcrypt.genSalt(10);
    this.hashed_password = await bcrypt.hash(this.hashed_password, salt);
    next();
  });
  

export const User = mongoose.model("User", userSchema);
