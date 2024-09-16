const mongoose = require('mongoose');

// Schema for individual time slots (start and end times)
const timeSlotSchema = new mongoose.Schema({
    start: {
        type: String,  // Store time in HH:MM format or use Date if preferred
        required: true,
    },
    end: {
        type: String,
        required: true,
    }
});

// Schema for availability on a specific day, including multiple time slots
const dayAvailabilitySchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true,
    },
    timeSlots: [timeSlotSchema]
});

// Main schema for the entire availability structure
const availabilitySchema = new mongoose.Schema({
    duration: {
        type: String,
        enum: ['1_week', '2_weeks', '3_weeks', 'one_month'],
        required: true,
    },
    daysAvailability: [dayAvailabilitySchema]
});


const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
