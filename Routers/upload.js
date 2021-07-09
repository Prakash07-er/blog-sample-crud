const router = require('express').Router()
const cloudinary = require('cloudinary')
const fs = require('fs')

// upload a image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
    
router.post('/upload',(req,res) => {
    try {
        // console.log(req.files)

        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg:'No files were uploaded'})

            const file = req.files.file;

            cloudinary.v2.uploader.upload(file.tempFilePath ,{folder: "test"} , async(err, result) => {
                if(err) throw err;

                removeTmp(file.tempFilePath)

                res.json({url: result.secure_url})
            } )

    } catch (err) {
        return  res.status(500).json({msg: err.message})
    }
})


// remove temp file path
const removeTmp = (path) => {
    fs.unlink(path, err =>{
        if(err) throw err;

    })
}


module.exports  = router