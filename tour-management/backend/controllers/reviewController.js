import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

// ==================== Create Review ====================
export const createReview = async (req, res) => {
  try {
    const { tourId } = req.params;

    // Check tour exists
    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    // Create review
    const review = await Review.create({
      ...req.body,
      tour: tourId,
    });

    // Add review reference to tour
    await Tour.findByIdAndUpdate(
      tourId,
      {
        $push: {
          reviews: review._id,
        },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });

  } catch (error) {
    console.error("Create Review Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit review",
    });
  }
};
