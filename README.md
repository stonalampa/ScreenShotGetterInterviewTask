# About
Simple client/server application with Socket.io. Server gets screenshots periodically and it will be automatically propagated to the client.

### Technologies in use:
1. NextJS for client.
2. NodeJS with ExpressJS for the server.

### How to run projects

## Client project
`cd client` \
`npm i` \
`npm run dev`

## Server project
`cd server` \
`npm i` \
`npm run dev`


### More details
When both are connected go to your browser on localhost:3000.
Client will connect to server, and get screenshots.
While on the page there is an open connection and after 20sec it will grab a screenshot and automatically it will be shown on the client.
Screenshots are saved locally in the src/screenshots folder. They are all .png files 1920x1080 resolution.