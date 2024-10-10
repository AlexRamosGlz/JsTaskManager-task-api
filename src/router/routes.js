import express from 'express';
import { commonsValidations } from 'JsTaskManager-commons-layer';
import { list } from '../services/list.js';
import { getTaskById } from '../services/get.js';
import { create } from '../services/create.js';
import { update } from '../services/update.js';
import { remove } from '../services/remove.js';

const router = express.Router();


/**
 * GET
 */
router.get('/', list);
router.get('/:id', [commonsValidations.idPathParam], getTaskById);


/**
 * POST
 */
router.post('/', create);


/**
 * PATCH 
 */
router.patch('/:id', [commonsValidations.idPathParam], update);


/**
 * DELETE
 */
router.delete('/:id', [commonsValidations.idPathParam], remove);

export default router;