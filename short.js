const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()
const shortid = require('shortid')
const urlWebstie = "http://www.short.com"
const tableName = 'shortURL'
let data ={
  shortURL: "",
  orignialURL: ""
}

let response = {
  statusCode: "",
  body: ""
}

exports.handler = async function(event, context) {
  if(event.body != null)
  {
    const original = event.body
    const short = shortid.generate()
    console.log(short)
    console.log(typeof(short))
    var params = {
      Item: {
        "shortuuid": {
          S: short
        },
        "longurl": {
          S: original
        }
      },
      TableName: tableName
    }
    ddb.putItem(params, function(err, data){
      if(err) console.log(err, err.statck)
      else console.log(data)
    })
    response.statusCode = 200
    data.shortURL = urlWebstie + short
    data.orignialURL = original
    response.body = JSON.stringify(data)
    console.log(response)

    return response
  }
  else response = { statusCode: 502, body: 'Body Empty!' }
}; 