# Requirments
- NodeJS 8.10
- AWS CLI
- SAM CLI
# Setup
- Create an S3 Bucket
- Edit Makefile -> variables at the top
- Run make setup
# Deployment
- make deploy
# Working Local
- make local (Will run sam local start-api)

 # Testing / Example Payloads
 ## short.js
### Successful
```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"originalURL":"google.com"}' \
  http://localhost:3000/short
```
#### Expected Result:
```json
{"shortURL":"-RkM-9o19","originalURL":"google.com"}%
```

 ### Failure
```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"riginalURL":"google.com"}' \
  http://localhost:3000/short
```
#### Expected Result:
```
Error: Make sure your body contains JSON like this - {"originalURL":"google.com"}%
```
## expand.js
### Successful
```bash
curl http://127.0.0.1:3000/-RkM-9o19
```
#### Expected Result:
```json
{"originalURL":"google.com","shortURL":"-RkM-9o19"}%
```
### Failure
```bash
curl http://127.0.0.1:3000/notInDB
```
#### Expected Result:
```json
{"message":"Internal server error"}
```