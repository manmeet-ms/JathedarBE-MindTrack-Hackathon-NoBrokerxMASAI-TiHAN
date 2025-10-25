
import express from 'express'
import { logViolation, getViolations, resolveViolation, flushViolations } from '../controllers/violation.controller.js'

const router = express.Router()

router.get('/', getViolations)

router.post('/log', logViolation)
router.post('/:id/resolve', resolveViolation)
router.post('/flush', flushViolations)

export default router
