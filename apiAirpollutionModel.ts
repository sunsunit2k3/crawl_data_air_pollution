const mongoose = require("mongoose");

const apiAirPotlutionSchema = new mongoose.Schema({
    location: {
        district_city: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    date: {
        date_type: {
            type: Date,
            required: true,
        },
    },
    co: {
        type: Number,
        required: true,
    },
    no2: {
        type: Number,
        required: true,
    },
    o3: {
        type: Number,
        required: true,
    },
    so2: {
        type: Number,
        required: true,
    },
    pm2_5: {
        type: Number,
        required: true,
    },
    pm10: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("apiairpollution", apiAirPotlutionSchema);