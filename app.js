const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
 
const tableName = 'article-ammar';
 


AWS.config.update({
    "region": "us-east-1",
    "accessKeyId": "AKIAQMBBVAWZB322HNV6",
    "secretAccessKey": "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"
   });
// Since we're using scan() method, no query
// is required for us
var params = {
    TableName: tableName
};
// port on which the server listens
const port = 3000;
const client = new AWS.DynamoDB.DocumentClient();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/rows/all", (req, res) => {

    // magic happens here

     

    client.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
          
    
      
            // send the obtained rows onto the response
            res.contentType = 'application/json';
            res.send(data);
        }
    });

  
});
 




app.get("/rows/:id", (req, res) => {

    // magic happens here

     const id = req.params.id;

     console.log(id);

     
 
        client.get({
            TableName: tableName,
            Key: {
                "articleId": +id,
              
            },
        }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                
        
      
                // send the obtained rows onto the response
                res.contentType = 'application/json';
                res.send(data);
            }
        });
 
     

});






app.post("/rows", (req, res) => {

    // magic happens here
 

     let body = req.body
     console.log(req.body);

      

        client
        .put({
          Item:body,
          TableName: tableName,
        },(err,data)=>{
            if(err){
                console.log(err);

            }else{
                res.contentType = 'application/json';
                res.send({
                  
                    body
                });
            }
        
         
          
        })
      
});




app.delete("/rows/:id", (req, res) => {

    // magic happens here

     const id = req.params.id;
 
  

        client
        .delete({
            TableName: tableName,
            Key: {
                "articleId": +id,
              
            },
        }, (err,data)=>{
            if(err){
                console.log(err);
            }
           
            res.contentType = 'application/json';
            res.send({
              
                "message":'deleted!'
            });
        })
      

});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});