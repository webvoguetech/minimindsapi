import multer from "multer";
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        if(req.baseUrl == '/categories'){
            cb(null, 'uploads/Categories')
        }else{
            cb(null,'uploads')
        }
    },
    filename: (req, file,cb) =>{
        cb(null,Date.now()+file.originalname)
    }
});

const Fileupload = multer({storage:storage});

export default Fileupload;