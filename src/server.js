import express from 'express';
import { response, commonsConstants, successCodes, serverErrorCodes, awsRequestId} from 'JsTaskManager-commons-layer'
import cors from 'cors';

import router from './router/routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(awsRequestId);

app.use('/tasks', router);

app.get('/', (req, res) =>  {
    try {
        response.success(res, req.awsRequestId, commonsConstants.SUCCESS_HEALTCHECK, commonsConstants.SUCCESS, successCodes.OK);
    } catch(error) {
        console.error(`${commonsConstants.ERROR} ${error}`);
        response.error(res, req.awsRequestId, commonsConstants.ERROR_HEALTCHECK, commonsConstants.ERROR, serverErrorCodes.INTERNAL_SERVER_ERROR);
    }
})

export default app;