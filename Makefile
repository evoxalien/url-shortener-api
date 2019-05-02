stackName  := short-url
bucketName := jv-url-short
region 	   := us-east-1
awsProfile := workshop

setup:
	export AWS_DEFAULT_PROFILE=$(awsProfile)

local:
	sam local start-api

build: 
	$(info - - - - CREATING PACKAGE - - - - )
	sam package \
	--template-file template.yml \
	--output-template-file package.yml \
	--s3-bucket $(bucketName)

deploy: build
	$(info  - - - - DEPLOYING - - - - )
	sam deploy \
	--template-file package.yml \
	--stack-name $(stackName) \
	--capabilities CAPABILITY_IAM \
	--region $(region)
	make clean

clean: 
	$(info - - - - CLEANING - - - - )
	rm package.yml


delete:
	$(info - - - - DELETEING - - - - )
	aws cloudformation delete-stack --stack-name $(stackName)
