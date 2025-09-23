import multer from 'multer';
import fs from 'fs';

const tempDir = "../public/temp";
if(!fs.existsSync(tempDir)){
    fs.unlinkSync(tempDir, {recursive: true})
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, tempDir)
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({storage});