const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()
const shortid = require('shortid')

var response = {}

exports.handler = async function(event, context) {
  if(event.body != null)
  {
    const short = shortid.generate()
    console.log(short)
    console.log(typeof(short))
    var params = {
      Item: {
        "shortuuid": {
          S: short
        },
        "longurl": {
          S: event.body
        }
      },
      //ReturnConsumedCapacity: "TOTAL",
      TableName: "shortURL"
  }

    ddb.putItem(params, function(err, data){
      if(err) console.log(err, err.statck)
      else console.log(data)
    })
    params.Item.shortuuid = "http://www.short.com/" + short
    response = { statusCode: 200, body: JSON.stringify(params) }
    //console.log(response)
  }
  else response = { statusCode: 400, body: 'Body Empty!' }
    return response;
}; 