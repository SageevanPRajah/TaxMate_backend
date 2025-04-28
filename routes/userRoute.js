import express from "express";
import { registerUser, loginUser, getUsers, getUserProfile, updateUser, deleteUser, uploadProfilePicture, updateUserRole} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { upload } from "../helper/cloudinarySetUp.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/", protect, getUsers); 
router.put('/:id/role', updateUserRole);
router.get("/profile", protect, getUserProfile);
router.put("/update", protect, updateUser);
router.delete("/:id", protect, deleteUser);

// Upload Profile Picture
router.post("/upload-profile", protect, upload.single("profilePicture"), uploadProfilePicture);


export default router;
