stackName  := sam-url
bucketName := johnv-testing-sam
region 	   := us-west-2
awsProfile := johnvenz

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
