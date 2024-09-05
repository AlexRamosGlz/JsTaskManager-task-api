import express from 'express';
import { commonsValidations } from 'JsTaskManager-commons-layer';

const router = express.Router();


/**
 * GET
 */
router.get('/', list);
router.get('/:id', [commonsValidations.idPathParam], get);


/**
 * POST
 */
router.post('/', create);


/**
 * PATCH 
 */
router.patch('/:id', [commonsValidations.idPathParam], updated);


/**
 * DELETE
 */
router.delete('/:id', [commonsValidations.idPathParam], remove);

export default router;