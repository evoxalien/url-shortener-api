const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()
const shortid = require('shortid')
require('dotenv').config()

exports.handler = async function(event, context) {
  if(event.body == null){
    return { statusCode: 406, body: "Error: No Data in Body"}
  }
  const parsedInput = JSON.parse(event.body)
  if(parsedInput.originalURL == undefined)
  {
    return { statusCode: 406, body: 'Error: Pass JSON - {"originalURL":"http://www.example.com/someLongURL"}'}
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
    return { statusCode: 200, body: JSON.stringify(data) }
  } 
  catch(err) {
    return { statusCode: 500, body: JSON.stringify(err) }
  }
} 