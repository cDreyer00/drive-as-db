# db-from-drive

Retrieves information from a Google Drive spreadsheet.

|language|type|
|-----|-----|
|JavaScript|programming|
|html|markup|
|css|style|

result:
```json
[
  {
    "language": "JavaScript",
    "type": "programming"
  },  
  {
    "language": "html",
    "type": "markup"
  },
  {
    "language": "css",
    "type": "style"
  }
]
```

## Setup

__Requirements:__
  - [NodeJS](https://nodejs.org)
  - A [Google Cloud](https://console.cloud.google.com/welcome?project=drive-nodejs-378420) project
  
  

- download this project and run
  ```
  npm install
  ```

- Setup credentials from a Google Cloud Service Account
  - Create a project in Google Cloud
  - [Enable the Drive API](https://console.cloud.google.com/flows/enableapi?apiid=drive.googleapis.com) in the project
  - Create a Service Account in [Credentials](https://console.cloud.google.com/apis/credentials?project=drive-nodejs-378420)
    - Access the service account and create a Json key
    - Place the json key in the project folder
    - Rename it to "credentials.json"
    
## Usage

In order to use this app, you will need to add the `client_email` from the credentials to the Google spreadsheet(s) you want to use.

- Run the following command to start the app:
```
npm run start
```

To retrieve information from a spreadsheet, send a JSON body containing the spreadsheet ID and the sheet name. For example:
```json
{
  "fileId": "ZP0M1uQyyXMi1cFX9b9W2aaOasfvxQVpQLu_Uji3FO84RIBM",
  "sheetName": "sheet"
}
```
