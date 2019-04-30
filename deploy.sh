#!/bin/bash
echo " - - - - CREATING PACKAGE - - - - "
sam package \
  --template-file template.yml \
  --output-template-file package.yml \
  --s3-bucket johnv-testing-sam
echo " - - - - DEPLOYING - - - - "
sam deploy \
  --template-file package.yml \
  --stack-name sam-url \
  --capabilities CAPABILITY_IAM \
  --region us-west-2