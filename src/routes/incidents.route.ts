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
// route for creating a new incident
router.post('/', authenticateUser, validateIncidentData, createIncident);

// route for getting a incident by id
router.get('/:id', authenticateUser, validateObjectId, getIncidentById);

// route for updating a incident by id
router.put('/:id', authenticateUser, validateObjectId, validateIncidentData, updateIncident);

// route for deleting a incident by id  
// Admin-only route
router.delete('/:id', authenticateUser, requireAdmin, validateObjectId, deleteIncident);


export default router;
