# Candidate Resume Application

This project is not intended for any type commercial use.

The project is intended for learning purposes.

Use case:

The Candidates will submit their information through a Flow exposed in a community public page,
after they finish they will be provided with link to their resume for them to share with the world,
this link points to a Node.js + [LWC OSS](https://lwc.dev/) + [JSforce](https://jsforce.github.io/) application hosted on Heroku (based on the [Build Apps with Lightning Web Components Open Source](https://trailhead.salesforce.com/en/content/learn/trails/build-apps-lightning-web-components-open-source) trail.

## Architecture (in progress)

-   Node.js
-   LWC OSS
-   JSforce
-   SFDX
-   [ETCopyData](https://github.com/eltoroit/ETCopyData) - credits to [Andres Perez](https://www.linkedin.com/in/eltoroit/)
-   VSCode Tasks

## How to start?

### Use VSCode tasks (ctrl+B or command+B) to:

1.  Install and setup project dependencies.
2.  Install ETCopyData plugin.
3.  Create, setup, initialize Scratch Org
4.  Create your .env file.

Then start simple by running `yarn watch` (or `npm run watch`, if you set up the project with `npm`). This will start the project with a local development server.

The source files are located in the [`src`](./src) folder. All web components are within the [`src/client/modules`](./src/modules) folder. The folder hierarchy also represents the naming structure of the web components. The entry file for the custom Express configuration can be found in the ['src/server'](./src/server) folder.

Find more information on the main repo on [GitHub](https://github.com/muenzpraeger/create-lwc-app).
