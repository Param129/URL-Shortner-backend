
import { saveShortUrl,getCustomShortUrl } from "../dao/short_url.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlServiceWithoutUser = async (url) => {
    const shorturl = await generateNanoId(7);
    
    if(!shorturl){
        throw new Error("short url not generated")
    }
    await saveShortUrl(shorturl,url)
    return shorturl;
}

export const createShortUrlServiceWithUser = async (url,userId,slug=null) => {
    const shorturl = slug || generateNanoId(7);
    const exists = await getCustomShortUrl(slug)
    if(exists) throw new Error("This custom url already exists")

    await saveShortUrl(shorturl,url,userId)
    return shorturl;
}