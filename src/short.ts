'use strict'
import * as aws from 'aws-sdk'
const ddb = new aws.DynamoDB()
import * as shortid from "shortid"
//import { String } from 'aws-sdk/clients/ecs';
require('dotenv').config()
//import * as dotenv from 'dotenv'
//dotenv.load()

export const handler = async function(event:any, context:any) {

  if(event.body == null){
    return { statusCode: 406, body: "Error: No Data in Body"}
  }
  const parsedInput = JSON.parse(event.body)
  if(parsedInput.originalURL == undefined)
  {
    return { statusCode: 406, body: 'Error: Pass JSON - {"originalURL":"http://www.example.com/someLongURL"}'}
  }

  const params :any = {
    Item: {
      "shortuuid": { S: shortid.generate() },
      "longurl": { S: parsedInput.originalURL }
    },
    TableName: process.env.TABLE_NAME || ""
  }

  const data = { 
    shortURL: process.env.API_ENDPOINT + params.Item.shortuuid.S, 
    originalURL: parsedInput.originalURL 
  }
  
  try {
    await ddb.putItem(params).promise()
    return { statusCode: 200, body: JSON.stringify(data) }
  } 
  catch(err) {
    return { statusCode: 500, body: JSON.stringify(err) }
  }
} 