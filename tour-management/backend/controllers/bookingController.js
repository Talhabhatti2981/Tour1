import Booking from '../models/Booking.js';

// Create a new booking
export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);

    try {
        const savedBooking = await newBooking.save();

        res.status(201).json({
            success: true,
            message: "Your tour is booked",
            data: savedBooking
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: err.message
        });
    }
};


// Get a single booking
export const getBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);
        res.status(200).json({
            success: true,
            message: "Booking fetched successfully",
            data: book
        });

    } catch (err) {
        res.status(404).json({
            success: true,
            message: "Failed to fetch booking",
            error: err.message
        });
    }
};


// Get all bookings
export const getAllBooking = async (req, res) => {
    try {
        const books = await Booking.find();

        res.status(200).json({
            success: true,
            message: "Bookings fetched successfully",
            data: books
        });

    } catch (err) {
        res.status(500).json({
            success: true,
            message: "Internal server error",
            error: err.message
        });
    }
};
