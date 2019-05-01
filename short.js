const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()
const shortid = require('shortid')
require('dotenv').config()

exports.handler = async function(event, context) {
  if(event.body == null){
    return { statusCode: 500, body: "Error: Try passing valid JSON"}
  }
  const parsedInput = JSON.parse(event.body)
  if(parsedInput.originalURL == undefined)
  {
    return { statusCode: 500, body: 'Error: Make sure your body contains JSON like this - {"originalURL":"google.com"}'}
  }

  const data = { 
    shortURL: shortid.generate(), 
    originalURL: parsedInput.originalURL 
  }

  const params = {
    Item: {
      "shortuuid": { S: data.shortURL },
      "longurl": { S: data.originalURL }
    },
    TableName: process.env.TABLE_NAME
  }

  try {
    await ddb.putItem(params).promise()
    return { statusCode: 200, body: JSON.stringify(data) };
  } 
  catch(err) {
    return { statusCode: 500, body: JSON.stringify(err) };
  }

}; 