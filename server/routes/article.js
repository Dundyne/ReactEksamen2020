import express from 'express';
import { articleController } from '../controllers/index.js';

const router = express.Router();

router.get('/', articleController.list);
router.get('/:id', articleController.get);
router.post(
  '/',articleController.create
);
router.put('/:id', articleController.update);
router.delete('/:id', articleController.remove);

export default router;