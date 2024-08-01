# To Do list app

Frontend used is nextjs nad backend used is spring boot. Firebase will help with authorization and connectivity.

To run the project with docker compose, perform the following steps:
 - 1st Run mongodb container: docker compose up mongodb -d
 - 2nd Run package the maven into a jar: ./mvn clean package -DMONGODB_URI=mongodb://mongodb:27017/to-do
 - 3rd: docker compose down
 - Last: docker compose up

 This is a basic spring boot & nextjs application which uses MongoDB & Spring Data & Firebase. Can be used as template for anyone.