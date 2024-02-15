import * as core from "express-serve-static-core";
import {Router} from "express";

import {userController} from '../controllers/user-controller';
import {scriptController} from '../controllers/script-controller';
import {collectionController} from '../controllers/collection-controller';
export const router: core.Router = Router();
import {body} from 'express-validator';

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

router.post('/scripts', scriptController.getScripts) // TODO: CamelCase
router.post('/newscript', scriptController.newScript)
router.post('/removescript', scriptController.removeScript)
router.post('/updatescript', scriptController.updateScript)


router.post('/collections', collectionController.getCollections)
router.post('/newCollection', collectionController.newCollection)
router.post('/removeCollection', collectionController.removeCollection)
router.post('/updateCollection', collectionController.updateCollection)