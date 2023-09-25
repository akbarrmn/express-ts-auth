import express from 'express';
import {get, merge} from 'lodash';

import { getUserBySessionToken } from '../models/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) =>{
    try {
        const {id} = req.params
        const currentUserId = get(req, 'identity._id') as string

        if (!currentUserId) {
            return res.sendStatus(403).send({status: false, message: 'unknown user'})
        }

        if (currentUserId.toString() !== id) {
            return res.sendStatus(403).send({status: false, message: 'unknown user'})
        }

        next()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({status: false, message: error})
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies["Akbar-auth"]

        if (!sessionToken) {
            return res.sendStatus(400)
        }

        const existingUser = await getUserBySessionToken(sessionToken)

        if (!existingUser) {
            return res.sendStatus(400)
        }

        merge(req, {identity: existingUser})

        return next()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}