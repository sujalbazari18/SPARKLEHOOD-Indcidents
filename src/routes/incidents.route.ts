import express from 'express';
import { validateIncidentData, validateObjectId } from '../middlewares/incidents.middleware';
import {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident
} from '../controllers/incidents.controller';
import { authenticateUser, requireAdmin } from '../middlewares/auth.middleware';

const router = express.Router();

// Public route - anyone can view all incidents
router.get('/', getAllIncidents);

// Protected routes - require authentication
router.post('/', authenticateUser, validateIncidentData, createIncident);
router.get('/:id', authenticateUser, validateObjectId, getIncidentById);
router.put('/:id', authenticateUser, validateObjectId, validateIncidentData, updateIncident);

// Admin-only route
router.delete('/:id', authenticateUser, requireAdmin, validateObjectId, deleteIncident);

export default router;
