import mongoose from "mongoose";
import { Schema } from "mongoose";


const offerPosterSchema = new Schema({
    url:{
        type:String,
        required:true
    }
});


const offerImagePoster = mongoose.model("OfferImagePoster",offerPosterSchema);

export {offerImagePoster};