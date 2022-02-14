# SOEN-390
COVID App for SOEN-390

## Installation

* You will need to install `nodejs` from here [Node](https://nodejs.org/en/) (and `npm`, but it is most likely installed with node)

### Backend development

* Make sure to create the `.env` file containing our secrets first

Install the dependencies with:

```
npm install
```

You can run the development server this way (or use `npm run dev:build`):

```
npm run build:client
npm run dev
```

Make sure you are running the development server by checking that your database is `jevaisbienaller-dev`. It will be displayed in the console.

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

## Extensions
* Vscode:
  * [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  * [(Backend) REST requests](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
* Webstorm:
  * [ESLint configuration](https://www.jetbrains.com/help/webstorm/eslint.html)
  * [(Backend) REST requests](https://www.jetbrains.com/help/webstorm/http-client-in-product-code-editor.html#composing-http-requests)