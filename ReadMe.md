# Requirements
- NodeJS 8.10
- AWS CLI
- SAM CLI
# Setup
- Create an S3 Bucket
- Edit Makefile -> edit the variables at the top
- Run make setup
# Deployment
- make deploy
# Working Local
- make local (Will run sam local start-api)

 # Testing / Example Payloads'
You must deploy before testing locally to setup DynamoDB
 ```bash
make deploy
make local
 ```
 ## short.js
### Successful
```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"originalURL":"google.com"}' \
  http://localhost:3000/short
```
#### Expected Result: JSON object with shortURL and originalURL
```json
{"shortURL":"http://localhost:3000/-RkM-9o19","originalURL":"google.com"}%
```

 ### Failure
```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"riginalURL":"google.com"}' \
  http://localhost:3000/short
```
#### Expected Result: Failure due to bad JSON element "riginalURL"
```
Error: Make sure your body contains JSON like this - {"originalURL":"google.com"}%
```
## expand.js
### Successful
```bash
curl http://127.0.0.1:3000/-RkM-9o19
```
#### Expected Result: Redirect to original URL
```json
{ statusCode: 308, headers: { "Location": "google.com" }}%
```
### Failure
```bash
curl http://127.0.0.1:3000/notInDB
```
#### Expected Result: Failure due to not being a valid URL
```json
{"message":"Internal server error"}
```