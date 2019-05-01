const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()
const tableName = 'shortURL'

exports.handler = async function(event, context) {
  let response = {}
  if(event.path == null)
  {
    return response = { statusCode: 500, body: 'Body Empty!' }
  }
  const stringArr = event.path.split('/')
  const short = stringArr[stringArr.length - 1]
  console.log(short)
  let params = {
    Key: {
        "shortuuid": { S : short }
    },
    TableName: tableName
  }
  try {
    await ddb.getItem(params, function(err,data) {
      const ret = {originalURL: data.Item.longurl.S,
        shortURL: data.Item.shortuuid.S}
      response = { statusCode: 200, body: JSON.stringify(ret) }
    }).promise()
    return response
    } 
    catch(err) {
      console.log(err)
      return { statusCode: 500, body: JSON.stringify(err) };
    }
}; 