const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()

exports.handler = async function(event, context) {
  let response = {}
  if(event.path == null)
  {
    return response = { statusCode: 500, body: 'Body Empty!' }
  }
  console.log(event)
  const stringArr = event.path.split('/')
  
  const params = {
    Key: {
        "shortuuid": { S : stringArr[stringArr.length - 1] }
    },
    TableName: process.env.TABLE_NAME
  }
  let ret = {}
  try {
    await ddb.getItem(params, function(err,data) { 
      ret = data
    }).promise()
    return { statusCode: 308, headers: { "Location": ret.Item.longurl.S } }
    } 
    catch(err) {
      return { statusCode: 500, body: JSON.stringify(err) }
    }
} 