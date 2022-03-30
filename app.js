const aws=require('aws-sdk');
const s3=new aws.S3();
const exp=require('express');
const serverless=require('serverless-http'); 
const app=exp(); 

console.log("inside the express")

app.get('/', async(req,res)=>{  
    console.log("inside the get method",req);   
    let u=req.apiGateway.event.url;
    let bodyvalue='<meta http-equiv = "refresh" content = "1; url = '+u+'"/>';
    let keyvalue=Math.random().toString(36).substring(2,7);
    console.log(bodyvalue)
    const params = {   
        Bucket: 'urlshotener',  
        Key: keyvalue,  
        Body:bodyvalue,
        WebsiteRedirectLocation:u,
        ACL:'public-read',
        ContentType:'html' 
 
    };
    let url = await s3.upload(params).promise();  
    console.log('The URL is', url); 
    return res.send(JSON.stringify({ 
        statusCode:200,
        body:JSON.stringify(url.Location) 
    }));
    

 
});
    
exports.lambdaHandler=serverless(app);