const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const path = require('path')

router.use(fileUpload());

// if (process.env.NODE_ENV === 'production') {
    
//     router.use(express.static('client/build'));

//     router.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

router.post('/upload',(req, res) => {
    if(!req.files){
        return status(400).json({msg : "No image found"});
    }
     res.json(req.files.file);
})

router.get('/',(req,res) =>{
    res.send("app is running")
})

module.exports = router;