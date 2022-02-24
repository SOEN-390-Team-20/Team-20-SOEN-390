[![CircleCI](https://circleci.com/gh/SOEN-390-Team-20/Team-20-SOEN-390/tree/main.svg?style=svg)](https://circleci.com/gh/SOEN-390-Team-20/Team-20-SOEN-390/tree/main)

# SOEN-390
COVID App for SOEN-390

## Deliverables

<details>
 <summary>Sprint 1</summary>
 
 * User Stories: [Link](https://docs.google.com/document/d/10e0HZjkWyzlSJokzyg2kVIG6lEmYFzd5JUu7HRchm74/edit?usp=sharing)
 * Release Plan: [Link](https://docs.google.com/spreadsheets/d/1AnwQnLcOWrc7WdgSCdrhiCFdA93MjsrW/edit?usp=sharing&ouid=102135473325782843143&rtpof=true&sd=true)
 * SAD: [Link](https://docs.google.com/document/d/1Ufmfg821g7_rF3dyY5VU9c14m0wEapiFrJ8mhEENNrI/edit?usp=sharing)
 * Risk Assessment: \[[Log](https://drive.google.com/file/d/1kEs8hGzfQoS4M2BgRx-tnM814cgZDpvR/view?usp=sharing)] \[[Plan](https://drive.google.com/file/d/1kEs8hGzfQoS4M2BgRx-tnM814cgZDpvR/view?usp=sharing)]
 * UI prototype: \[[Doc](https://docs.google.com/document/d/1vIKDfNXSNiLRZCsmxhTnLM62R3UDsN8ENk8Hd2ggnEY/edit?usp=sharing)] \[[Figma](https://www.figma.com/file/RnPSGbdIQBEvGQPM6Kxqdv/Wireframes?node-id=2%3A2)]
 * Running Prototype: \[[Frontend](http://ec2-15-223-77-239.ca-central-1.compute.amazonaws.com:3000/)] \[[Backend](http://ec2-15-223-77-239.ca-central-1.compute.amazonaws.com:3001/)]
 * Sprint Retrospective: [Link](https://docs.google.com/document/d/1iTohXd3ckTxBPp3_kZDx-4ve5Yf9xTZEQawz6jqnY2Q/edit?usp=sharing)

</details>

<details>
 <summary>Sprint 2</summary>
</details>

## Docker (Production Server)
* Warning: This can take 5 minutes...
* You can get a production build running with Docker by:
  * Putting [our .env](https://github.com/SOEN-390-Team-20/.env/blob/main/.env) in the `/repo/.env`
  * Running `docker-compose up`

## Development

* You will need to install `nodejs` from here [Node](https://nodejs.org/en/) (and `npm`, but it is most likely installed with node)

### Backend development

**Important**: Make sure to create the `.env` file containing our secrets first under `/repo/.env` (copy/paste [this](https://github.com/SOEN-390-Team-20/.env/blob/main/.env))

Install the dependencies with:

```
npm install
```

You can run the development server this way (or use `npm run dev:build`):

```
npm run build (build the static frontend)
npm run dev
```

Make sure you are running the development server by checking that your database is `jevaisbienaller-dev`. It will be displayed in the console.

The app will be running on `http://localhost:3001/`

#### Backend Unit tests

To run the tests you must build before if you haven't already

```
npm run build
npm run test
```

### Fontend development


* The frontend is inside the `./client` folder.

Assuming you are in the root of the repo, install the dependencies with this command

```
cd client
npm install
```

You can run the development server this way:

```
cd client (if not already)
npm run start (or `npm start` for short)
```

Notice how in the backend, the command is `npm run dev` and in frontend, the command is `npm run start`
Notice also that you did not need to `npm run build`

The app will be running on `http://localhost:3000/`

### Tests and Linter

#### Unit tests

* Make sure to be either at `/repo/` for backend or `/repo/client` for frontend

```
npm run test (all tests)
npm run <filename> (specific test file)
```

#### Linting

* For linting, there are several commands. They work on both folders.
```
npm run lint <filename> (specific test file)
npm run lint:all (the whole directory)
npm run lint:fix (lint the whole directory and autofix it)
```

#### End2end Testing with Cypress

* You should be at `/repo/` to run these commands

With UI:
```
npm run build
npm run cy:start
```

Without UI:
```
npm run build
npm run cy:run
```

## Extensions
* Vscode:
  * [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  * [(Backend) REST requests](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
* Webstorm:
  * [ESLint configuration](https://www.jetbrains.com/help/webstorm/eslint.html)
  * [(Backend) REST requests](https://www.jetbrains.com/help/webstorm/http-client-in-product-code-editor.html#composing-http-requests)
