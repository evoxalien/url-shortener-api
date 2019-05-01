const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()

exports.handler = async function(event, context) {
  let response = {}
  if(event.path == null)
  {
    return response = { statusCode: 500, body: 'Body Empty!' }
  }
  const stringArr = event.path.split('/')
  const short = stringArr[stringArr.length - 1]
  
  const params = {
    Key: {
        "shortuuid": { S : short }
    },
    TableName: process.env.TABLE_NAME
  }
  
  try {
    await ddb.getItem(params, function(err,data) {
      const body = {originalURL: data.Item.longurl.S,
        shortURL: data.Item.shortuuid.S}
      response = { statusCode: 200, body: JSON.stringify(body) }
    }).promise()
    return response
    } 
    catch(err) {
      return { statusCode: 500, body: JSON.stringify(err) };
    }
}; 