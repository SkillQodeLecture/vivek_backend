import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_NAME_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type:"auto"
        })
        // console.log("file is uploaded on cloudnary" , response.url);
        // fs.unlinkSync(localFilePath)
        return response;
    }catch(err){
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary}

// (async function () {
//     // Upload an image
//     const uploadResult = await cloudinary.uploader
//         .upload(
//             'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//             public_id: 'shoes',
//         }
//         )
//         .catch((error) => {
//             console.log(error);
//         });

//     console.log(uploadResult);

    // // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });

    // console.log(optimizeUrl);


    // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });

    // console.log(autoCropUrl);
// })();


