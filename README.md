# Coupon Code Validator
This repository holds the backend resources for coupon code validator

### Services
- AWS Lambda
- Amazon DynamoDB
- Amazon API Gateway
- Serverless Framework for IaC.
- GitHub actions for CI/CD.
- Webpack for bundling code.
- ESLint for code linting.

### How to set up the project

#### `git clone https://github.com/iabhishek07/coupon-code-validator.git`
- Clone this repository

#### `npm install`
- This will install all the required dependencies.

#### `npm run format`
- format all the files using ESLint

#### `npm run bundle`
- Packages the code using WebPack

#### `sls deploy --stage <dev/prod> --region <region>`
- This command will deploy the resources to AWS using dev credentials

### Folder Structure
```markdown
.
├── .gitHub             # CI/CD workflow for GitHub actions
├── CreateCouponCode    # Lambda code to create a new coupon code
├── ListCouponCodes     # Lambda code to list all the coupon codes 
├── ValidateCouponCodes # Lambda code to validate the coupon code and return discount amount
├── helpers             # Folder holding constants and helper functions for other lambdas
├── serverless.yml      # Serverless framework resource configuration file
├── TestFiles           # Testing files helpful to test APIs using postman or lambda console
├── LICENSE
└── README.md
```
### CI/CD Setup (GitHub Actions Workflow)
#### Steps to set up CI/CD using GitHub Actions
The following is the list of steps that is executed as a part of the CI/CD setup:

1. Store all account credentials in GitHub secrets to access them in environment without exposing. The AWS credentials will be used for deploying the application into your AWS account.
```
AWS_ACCESS_KEY_ID: ${{secrets.AWS_ACCESS_KEY_ID}}
AWS_SECRET_ACCESS_KEY: ${{secrets.AWS_SECRET_ACCESS_KEY}}
DEV_REGION: ${{secrets.DEV_REGION}}
PROD_REGION: ${{secrets.PROD_REGION}}
```
2. Install serverless
3. Install npm
4. Bundle project using webpack
5. Deploy to dev environment: Singapore (ap-southeast-1)
6. Deploy to prod environment: Mumbai (ap-south-1)

### Steps to test deployed APIs
#### 1. Create Coupon Code
- Fetch the deployed API endpoint for create coupon code POST API from API Gateway console or from GitHub actions dev-deploy/prod-deploy job
- Open Postman
- Paste the API endpoint in Postman with Method as POST
- From `TestFiles` folder copy the contents from the `createCouponCodes.json` file, change values accordingly and paste in the body of POST API
- Click "Send"
- You should get 201 status code with created item as response.
- Alternatively, If you want to test from Lambda console, Go to deployed lambda in test event paste contents of `createCouponCode-apigw.json` and hit "Test"

#### 2. List Coupon Codes
- Fetch the deployed API endpoint for List coupon codes GET API from API Gateway console or from GitHub actions dev-deploy/prod-deploy job
- Open Postman
- Paste the API endpoint in Postman with Method as GET
- Click "Send"
- You should get 200 status code with array of all the items as response
- Alternatively, If you want to test from Lambda console, Go to deployed lambda and hit "Test"

#### 3. Validate Coupon Code
- Fetch the deployed API endpoint for Validate coupon code GET API from API Gateway console or from GitHub actions dev-deploy/prod-deploy job
- Open Postman
- Paste the API endpoint in Postman with Method as GET
- Go to `Params` tab in Postman and add two keys "couponCode" & "totalCartAmount" with the appropriate values
- Click "Send"
- You should get 200 status code with the object consisting two parameters "isValid" & "discountAmount" as response body
- Alternatively, If you want to test from Lambda console, Go to deployed lambda in test event paste contents of `validateCouponCode-apigw.json` and hit "Test"