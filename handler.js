import app from "./src/server.js";
import serverless from 'serverless-http';

const sls = serverless(app);

export const handler = async (event, context) => {
    console.log(`### ${event.requestContext?.http?.method} ${event.requestContext?.http?.path}`);

    return sls(event, context);
}