const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()
const shortid = require('shortid')
const urlWebsite = "http://www.short.com"
const tableName = 'shortURL'
//process.env.NAMEWHATEVER
exports.handler = async function(event, context) {
  if(event.body == null){
    return { statusCode: 500, body: "Error: Try passing valid JSON"}
  }
  const parsedInput = JSON.parse(event.body)
  if(parsedInput.originalURL == undefined)
  {
    return { statusCode: 500, body: 'Error: Make sure your body contains JSON like this - {"originalURL":"google.com"}'}
  }

  let data ={
    shortURL: "",
    originalURL: ""
  }
  
  let response = {
    statusCode: "",
    body: ""
  }

  const original = parsedInput.originalURL
  const short = shortid.generate()
  console.log(short)
  console.log(typeof(short))
  console.log(original)
  console.log(typeof(original))
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

  data.shortURL = short
  data.originalURL = original

  try {
    await ddb.putItem(params).promise()
    return { statusCode: 200, body: JSON.stringify(data) };
  } 
  catch(err) {
    console.log(err)
    return { statusCode: 500, body: JSON.stringify(err) };
  }

}; 