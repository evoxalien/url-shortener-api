'use strict'

//const aws = require('aws-sdk')
import * as aws from 'aws-sdk'
const ddb = new aws.DynamoDB()

export const handler = async function(event :any, context :any) {
  console.log(event)
  console.log(context)
  if(event.path == null)
  {
    return { statusCode: 500, body: 'Body Empty!' }
  }
  const stringArr = event.path.split('/')
  
  const params = {
    Key: {
        "shortuuid": { S : stringArr[stringArr.length - 1] }
    },
    TableName: process.env.TABLE_NAME || "shortURL"
  }
  let ret :any = {}
  try {
    await ddb.getItem(params, function(err:any,data:any) { 
      ret = data
    }).promise()
    return { statusCode: 308, headers: { "Location": ret.Item.longurl.S } }
    } 
    catch(err) {
      console.log(err)
      return { statusCode: 404, body: "URL Does Not Exist" }
    }
} 