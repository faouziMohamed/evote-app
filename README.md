# evote-app

A simulation of online voting using basic nodejs, express and openPGP for encryption.

## Testing

1. First you need to install [mongodb server](https://www.mongodb.com/try/download/community) in you machine

   - 🤭 By the way you can Fork 🐸 and star 💓 ⭐ the repo

1. Install [NodeJs](https://nodejs.org/en/download/) version > 10. Though, NodeJs LTS version 14 is recommended.
1. Clone the repo using one of the two methods:
   ```bash
     # Using https link
     git clone https://github.com/faouziMohamed/evote-app.git
   ```
   ```bash
    # Or using the ssh link
    git git@github.com:faouziMohamed/evote-app.git
   ```
1. Change directory to `evote-app` and install dependencies:

   ```bash
     cd evote-app
   ```

   - Install dependencies using `npm`

     ```bash
     npm install
     ```

   - Or using `yarn`
     ```bash
     yarn
     ```
1. For testing purpose create a file called `.env` in the root of the project (`evote-app`) and paste the following content:  
    This file will not be stagged into Git, Keep it only localy. Note that random secret bellow are generated using [`nanoid`](https://www.npmjs.com/package/nanoid#usage 'nanoid npm page')
    ```env
      PORT = 3000
      APP_NAME = 'evote-app'
      DB_URL_DEV = 'mongodb://localhost:27017/evote-app'
      # Change the uri bellow with a mongo cloud atlas uri for production  
      DB_URL_PROD = 'mongodb://localhost:27017/evote-app'
      SESSION_EXPIRY = 1296000000
      SESSION_MAXAGE = 1296000000

      SERVER_NAME = 'Web Server in node'
      SERVER_EMAIL = 'server@webserver.ma'
      SERVER_PASSHPRASE = 'U2FsdGVaJunkyRanDomSECRETuP'

      COCENTER_NAME = 'Counting Center'
      COCENTER_EMAIL = 'co.server@server.ma'
      COCENTER_PASSHPRASE = 'CPutHere A RANDOM SECRET9yfDbhnBm51kSNpkL'

      VALIDATION_CENTER_NAME = 'Validation Center'
      VALIDATION_CENTER_EMAIL = 'validation.server@server.ma'
      VALIDATION_CENTER_PASSHPRASE = 'your RANDOM SERCER HERE plLrtFj2T7S'

      PASSPHRASE_KEY = 'RANDOMw22PiTFHSECRET0vQdZzUHQvIR98OWbVwpw9qZT_h'
      SESSION_SECRET='cZk_slfK84QiDDo-vMARANDOM SECRET CODElKJRUs-v7QbxUW-4'
    ```
1. Bundle javascript file for browser (using [webpack5](https://webpack.js.org/ 'Webpack official website')) by running : 
   |npm |-| yarn|
   |-----|-|----|
   |`npm run wpack`|Or|`yarn wpack`|
1. Then run tests on local typing:
   |npm |-| yarn|
   |-----|-|----|
   |`npm run dev`|Or|`yarn dev`|
1. Open in your browser the url http://localhost:3000 to see result

## 🆗 That's it!!!

LICENSE [MIT](LICENSE)
