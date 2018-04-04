# PORTAL UI

> A Vue.js project + Vuex (FLUX architecture)

## Serve with hot reload at localhost:3000
```
npm start
```

## Build for production with minification
```
npm run build
```

## Lint process
```
npm run lint
```
Also, lint was included in build process as webpack loader

## Deploy using Google Firebase for a demo
**1** Goto 
https://console.firebase.google.com

**1.1** Sign in using your Gmail account.

**1.2** Add project as **test-portal-ui**.

**2** In your console in the root directory of UI-project execute a command:
```
npm run deploy
```

**Question**: Allow Firebase to collect anonymous CLI usage and error reporting information? 

**Answer**: Press "Enter"

**2.1** Next, grant permissions for firebase tools from your gmail account. 

After you see a label "Firebase CLI Login Successful"

**2.2** Return to your console.

**Question:** Are you ready to proceed? 

**Answer:** Press "Enter"

**Question:** Which Firebase CLI features do you want to setup for this folder? ... 

**Answer:** Hosting (4th item) and press "Space" then "Enter"

**Question:** Select a default Firebase project for this directory:

**Answer:** "test-portal-ui" and press "Enter"

**Question:** What do you want to use as your public directory?

**Answer:** "dist" and press "Enter"

**Question:** Configure as a single-page app? 

**Answer:** "y" and press "Enter"

**Question:** File dist/index.html already exists. Overwrite? 

**Answer:** "n" and press "Enter"


Next, wait for the deploy processing...

**3** Great, now UI is accessible approximately by the URL 
https://test-portal-ui-<ID>.firebaseapp.com

_Note! ID in URL depends on every deploy._


_For details see_ https://firebase.google.com/docs/hosting/quickstart

