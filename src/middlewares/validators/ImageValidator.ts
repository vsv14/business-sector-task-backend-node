import multer from 'multer';
import path from 'path';



const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../../static/images'))
    },
    filename (req, file, cb) {
        const strs = file.originalname.split('.');
        const type = strs[strs.length-1];
        const newName = 'img-' + Date.now()+'.'+type;
        cb(null, newName);
    },
})
const UploadConfig= multer({
    storage,
    limits:{
        fileSize: 10000000,
    },
    fileFilter (req, file, cb){
        const img = /(\.png|\.jpg)$/.test(file.originalname);
        cb(null, img);
    }
});

export default UploadConfig;

