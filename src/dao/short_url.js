import urlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const  saveShortUrl = async(shorturl,longurl,userId) =>{
    try{
        const newurl = new urlSchema({
            full_url:longurl,
            short_url:shorturl
        })
    
        if(userId){
            newurl.user = userId
        }
    
        await newurl.save();
    }
    catch(err){
        if(err.code == 11000){
            throw new ConflictError("Short url already exists");
        }
        throw new Error(err);
    }
}


export const getshortUrl = async (shortUrl) =>{
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}});
}

export const getCustomShortUrl = async (slug) => {
    return await urlSchema.findOne({short_url:slug});
}