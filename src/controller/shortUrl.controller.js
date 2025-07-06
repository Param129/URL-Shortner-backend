import { getshortUrl } from "../dao/short_url.js";
import {createShortUrlServiceWithoutUser,createShortUrlServiceWithUser } from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";


export const createShortUrl = wrapAsync(async(req,res) => {
        const data= req.body;
        let shorturl
        if(!req.user){
            shorturl = await createShortUrlServiceWithoutUser(data.url);
        }
        else{
            shorturl = await createShortUrlServiceWithUser(data.url,req.user._id,data.slug);
        }

        res.status(200).json({
            msg:"Url saved in DB",
            url:process.env.APP_URL + shorturl
        })
})


export const redirectFromShorturl = wrapAsync(async (req,res) =>{
        const {id} = req.params;
        const url = await getshortUrl(id);
        if(!url){
            throw new Error("Short url not found")
        }
        res.redirect(url.full_url);
})


export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const {url,slug} = req.body
    const shortUrl = await createShortUrlWithtUser(url,customUrl)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})