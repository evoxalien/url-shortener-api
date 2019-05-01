const aws = require('aws-sdk')
const ddb = new aws.DynamoDB({region: "us-west-2"})

const tableName = 'shortURL'
const short = "HR1B1KVhc"

var params = {
    Key: {
        "shortuuid": { S : short }
    },
    TableName: tableName
}

ddb.getItem(params, function(err,data) {
    //onsole.log(err)
    console.log(data.Item)
})