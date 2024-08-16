const AWS = require('aws-sdk')
var { nanoid } = require("nanoid");

const awsConfig = {
    accesKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccesKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
}
const S3 = new AWS.S3(awsConfig)
async function uploadImage (req,res) {
    //console.log(req.body)
    console.log(process.env.AWS_ACCESS_KEY_ID,process.env.AWS_SECRET_ACCESS_KEY,process.env.AWS_REGION)
    try {
        const {image,bucketName} = req.body
        console.log(bucketName)
        //console.log(image)
        if (!image) return res.status(400).send("No Image")

        // prepare the image
        const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/,""),"base64");
        const type = image.split(';')[0].split("/")[1];
        //image params 
        const params = {
            Bucket: bucketName,
            Key:`${nanoid()}.${type}`,
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding:"base64",
            ContentType: `image/${type}`,
        }

        //upload to s3
        S3.upload(params,(err, data) => {
            if (err) {
                console.log(err)
                return res.sendStatus(400);
            }
            console.log(data)
            res.send(data)
        });
    } catch (err) {
        console.log(err)
    }
}
async function removeImage (req,res) {
    try {
        const {image} = req.body
        const params ={
            Bucket: image.Bucket,
            Key: image.Key,
        }
        S3.deleteObject(params, (err,data) => {
            if (err){
                console.log(err)
                res.sendStatus(400);
            }
            res.send({ok: true})
        })
    } catch (err) {
        console.log(err)
    }
}


module.exports = {uploadImage,removeImage}