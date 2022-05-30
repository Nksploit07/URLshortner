
const aws=require('aws-sdk');
const s3=new aws.S3();
exports.handler = async (event) => {
    // TODO implement
    console.log({event}) 
    if(event.requestContext.http.method=="POST")   
    {
      
        console.log("Inside The Handler",event); 
        event=JSON.parse(event.body);
        let url=event.url;
        let bodyvalue='<meta http-equiv = "refresh" content = "1; url = '+url+'"/>'; 
        let objectname=Math.random().toString(36).substring(2,7);
        console.log(bodyvalue);  
        const params = {   
        Bucket: 'urlshortners3',  
        Key: objectname,   
        Body:bodyvalue,
        WebsiteRedirectLocation:url, 
        ACL:'public-read',
        ContentType:'.html' 
 
    };
    let shorturl = await s3.upload(params).promise();  
    console.log('The URL is', url); 
    return {
        // "statusCode":200,  
        "body":JSON.stringify(shorturl.Location)   
 
    };
    }
    
};
