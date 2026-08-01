
import Tour from '../models/Tour.js'

// create new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();

        res.status(200).json({success: true, message: "successfully created", data: savedTour});
    } catch (err) {
        res.status(500).json({success: false, message:"Failed to create tour. Try again." });
    }
};


// update tour
export const updateTour = async (req, res) => {    

    const id = req.params.id;

    try {

        const updatedTour = await Tour.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(200).json({success: true, message: "successfully updated", data: updatedTour});

    } catch (err) {
        res.status(500).json({success: false, message:"Failed to update tour" });
    }
};
// delete tour
export const deleteTour = async (req, res) => {    
    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "successfully deleted"});

    } catch (err) {
        res.status(500).json({success: false, message:"Failed to delete tour" });
    }
};
// getSingle tour
export const getSingleTour = async (req, res) => {    
    const id = req.params.id;

    try {
        const tour = await Tour
        .findById(id)
        .populate("reviews");

        res.status(200).json({success: true, message: "successfully found", data: tour});

    } catch (err) {
        res.status(404).json({success: false, message:"not found" });
    }
};
// getAll tour
export const getAllTour = async (req, res) => {  


    // for pagination
    const page = parseInt(req.query.page);

    try {

        const tours = await Tour.find({})
        .populate("reviews")
        .skip(page * 8)
        .limit(8);

        res
        .status(200)
        .json({
            success: true, 
            count: tours.length,
            message: "successfully found",
            data: tours});

    } catch (err) {
        res.status(500).json({success: false, message:"not found" });
    }
};



// get tour by search
export const getTourBySearch = async (req, res) => {
    const cityQuery = (req.query.city || "").trim();
    const distance = parseInt(req.query.distance, 10);
    const maxGroupSize = parseInt(req.query.maxGroupSize, 10);

    try {
        const filters = {};

        if (cityQuery) {
            const city = new RegExp(cityQuery, "i");
            filters.$or = [{ city }, { title: city }, { address: city }];
        }

        if (!Number.isNaN(distance) && distance > 0) {
            filters.distance = { $gte: distance };
        }

        if (!Number.isNaN(maxGroupSize) && maxGroupSize > 0) {
            filters.maxGroupSize = { $gte: maxGroupSize };
        }

        const tours = await Tour.find(filters).populate("reviews");
        res
            .status(200)
            .json({ success: true, message: "successfully found", data: tours });
    } catch (err) {
        res.status(500).json({ success: false, message: "not found" });
    }
};


// get featured tours
export const getFeaturedTours = async (req, res) => {  


    // for pagination
    const page = parseInt(req.query.page);

    try {

        const tours = await Tour.find({featured: true})
        .populate("reviews") 
        .limit(8);

        res
        .status(200)
        .json({
            success: true, 
            count: tours.length,
            message: "successfully found",
            data: tours});

    } catch (err) {
        res.status(500).json({success: false, message:"not found" });
    }
};


// get tour count
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({ success: true, data: tourCount });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch tour count" });
    }
};
