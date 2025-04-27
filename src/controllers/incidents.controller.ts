import { Request, Response } from 'express';
import Incident from '../models/incidents.models';

// Create a new incident
const createIncident = async (req: Request, res: Response): Promise<void> => {
  try {
    // Add user information if authenticated
    if (req.user) {
      req.body.reportedBy = req.user.username;
    }
    
    const incident = new Incident(req.body);
    const savedIncident = await incident.save();
    res.status(201).json(savedIncident);
  } catch (error) {
    res.status(500).json({ message: 'Error creating incident', error });
  }
};

// Get all incidents with filtering options
const getAllIncidents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      severity, 
      incidentType, 
      status, 
      startDate, 
      endDate,
      reportedBy,
      sort = '-createdAt'  // Default sort by newest first
    } = req.query;
    
    // Build filter object
    const filter: any = {};
    
    if (severity) {
      filter.severity = severity;
    }
    
    if (incidentType) {
      filter.incidentType = incidentType;
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (reportedBy) {
      filter.reportedBy = reportedBy;
    }
    
    // Date range filtering
    if (startDate || endDate) {
      filter.createdAt = {};
      
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate as string);
      }
      
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate as string);
      }
    }
    
    // Execute query with pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const incidents = await Incident.find(filter)
      .sort(sort as string)
      .skip(skip)
      .limit(limit);
      
    const total = await Incident.countDocuments(filter);
    
    res.status(200).json({
      incidents,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching incidents', error });
  }
};

// Get incident by ID
const getIncidentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      res.status(404).json({ message: 'Incident not found' });
    } else {
      res.status(200).json(incident);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching incident', error });
  }
};

// Update incident
const updateIncident = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedIncident = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedIncident) {
      res.status(404).json({ message: 'Incident not found' });
    } else {
      res.status(200).json(updatedIncident);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating incident', error });
  }
};

// Delete incident
const deleteIncident = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedIncident = await Incident.findByIdAndDelete(req.params.id);

    if (!deletedIncident) {
      res.status(404).json({ message: 'Incident not found' });
    } else {
      res.status(200).json({ message: 'Incident deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting incident', error });
  }
};

// export all the functions
export {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident
};
