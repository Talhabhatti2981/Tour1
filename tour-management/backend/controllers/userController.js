import User from "../models/User.js";

// ==================== Create User ====================
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    const userData = await User.findById(user._id).select("-password");

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userData,
    });
  } catch (error) {
    console.error("Create User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

// ==================== Update User ====================
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

// ==================== Delete User ====================
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// ==================== Get Single User ====================
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Get User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
    });
  }
};

// ==================== Get All Users ====================
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
};
