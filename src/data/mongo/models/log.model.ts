import mongoose from "mongoose";


const logSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    level: {
        type: String,
    }, 
    createAt: {
        type: Date,
        default: Date.now,
    },
    
});

export const LogModel  = mongoose.model('Log', logSchema);





