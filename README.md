# About

A simple seed project for client/server architecture.

### Technologies in use:

1. Nextjs for client.
2. Nodejs with expressJs for the server.

# Run Instructions

## Client project

### Run

`cd client` \
`npm i` \
`npm run dev`

## Server project

There are multiple ways to run this project.

1. Run:
   `cd server` \
   `npm i` \
   `tsc` [require typescript installed] \
   `node dist/app.js`

2. Use vscode \
   Example `launch.json` configuration:

```
 {
    "type": "pwa-node",
    "request": "launch",
    "name": "Launch server",
    "skipFiles": ["<node_internals>/**"],
    "program": "${workspaceFolder}/server/dist/app.js",
    "outFiles": ["${workspaceFolder}/server/**/*.js"],
    "preLaunchTask": "tsc: build - server/tsconfig.json",
    "env": {}
}
```
