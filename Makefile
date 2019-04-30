stackName  := sam-url
bucketName := johnv-testing-sam
region 	   := us-west-2
awsProfile := johnvenz

setup:
	export AWS_DEFAULT_PROFILE=$(awsProfile)

build: 
	echo " - - - - CREATING PACKAGE - - - - "
	sam package \
	--template-file template.yml \
	--output-template-file package.yml \
	--s3-bucket $(bucketName)

deploy: build
	echo " - - - - DEPLOYING - - - - "
	sam deploy \
	--template-file package.yml \
	--stack-name $(stackName) \
	--capabilities CAPABILITY_IAM \
	--region $(region)
	make clean

delete:
	echo " - - - - DELETEING - - - - "
	aws cloudformation delete-stack --stack-name $(stackName)

clean: 
	rm package.yml