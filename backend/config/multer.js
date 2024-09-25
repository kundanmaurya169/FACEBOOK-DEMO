const multer= require('multer');
const path= require('path');


// creating storage to store file 
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/'); // folder name where file is stored
    },
    filename:(req,file,cb)=>{
        // file name will be the original name of the file
        cb(null, `${Date.now()}-${file.originalname}`); 
    },
});
// Initialize upload
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/; // Acceptable file types
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!'); // Reject files that aren't images
        }
    },
});

module.exports = upload;