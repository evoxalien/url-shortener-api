const aws = require('aws-sdk')
const ddbDC = new aws.DynamoDB.DocumentClient()
const tableName = 'shortURL'
//const shortid = require('shortid')

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
    const stringArr = event.body.split('/')
    const short = stringArr[stringArr.length - 1]

    //console.log("StringArr:", stringArr)
    //console.log("Arry Len:", stringArr.length)
    //console.log(short)
    //console.log(typeof(short))

    var params = {
      
      ExpressionAttributeValues: {
        "shortuuid": {
          S: short
        }
      },
      KeyConditionExpression: "#shortuuid = :",
      ProjectionExpression: [
        "longurl"
      ],
      //ReturnConsumedCapacity: "TOTAL",
      TableName: tableName
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

    response.statusCode = 200
    data.shortURL = urlWebstie + short
    data.orignialURL = original
    response.body = JSON.stringify(data)
    console.log(response)
  }
  else response = { statusCode: 502, body: 'Body Empty!' }
  console.log(response)

  
  return response
}; 