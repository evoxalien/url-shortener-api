const aws = require('aws-sdk')
const ddbDC = new aws.DynamoDB.DocumentClient()
//const shortid = require('shortid')

var response = {}

exports.handler = async function(event, context) {
  if(event.body != null)
  {
    const stringArr = event.body.split('/')
    console.log("StringArr:", stringArr)
    console.log("Arry Len:", stringArr.length)
    const short = stringArr[stringArr.length - 1]
    console.log(short)
    console.log(typeof(short))
    var params = {
      AttributesToGet: [
        "longurl"
      ],
      Key: {
        "shortuuid": {
          S: short
        }
      },
      //ReturnConsumedCapacity: "TOTAL",
      TableName: "shortURL"
  }
    ddbDC.query(params, function(err, data){
      if(err) console.log(err, err.statck)
      else {
        console.log(data)
        return { statusCode: 200, body: JSON.stringify(data) }
      }
    })
    //params.Item.shortuuid = "http://www.short.com/" + short
    //response = { statusCode: 200, body: JSON.stringify(params) }
    //console.log(response)
  }
  else response = { statusCode: 400, body: 'Body Empty!' }
  console.log(response)

  
  return response = { statusCode: 200, body: "Blah" }
}; 