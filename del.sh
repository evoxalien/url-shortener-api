#!/bin/bash
stackName=sam-url

echo " - - - - DELETEING - - - - "
aws cloudformation delete-stack --stack-name $stackName

#. ./deploy.sh
