import express from 'express';

import authentication from './authentication.routes';
import usersRoutes from './users.routes';

const router = express.Router();

export default (): express.Router => {
    authentication(router)
    usersRoutes(router)

    return router
}