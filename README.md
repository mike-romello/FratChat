# FratChat

# LIVE DEVELOPMENT

### Get Added to Phi Psi room:
1. Navigate to the /backend folder
2. Add env.json file to backend folder
3. Add serviceAccountKey.json file to backend folder
4. Open setupSchema.js and find users array by searching for comment: // ADD NEW EMAILS HERE
5. Add your gmail to this array
6. Go to live hosting and sign in with the specified gmail: https://fratchat-f8eda.web.app/
7. Once signed in with google, you should see a welcome message. AFTER you are on this page run: `node setupSchema.js`
8. Once script completes, Refresh and you should see phi psi room card added


**With any difficulty, please Reach out to me sc4257@drexel.edu** 

# LOCAL DEVELOPMENT

### Launch Frontend Application (Anuglar)

1. Install Angular CLI: 14.2.13 (globally)
2. Set node/npm versions to (done easily with nvm)
    - node: 14.16.1
    - npm: 6.14.12 
3. Run `npm install` in the /frontend folder
4. Run `ng serve` to launch local angular app

### Launch Backend Server

1. Run `npm install` in the /backend folder
2. Add env.json file to backend folder
3. Add serviceAccountKey.json file to backend folder
4. Run `node server.js` to launch the server