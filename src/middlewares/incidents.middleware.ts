import { Request, Response, NextFunction } from 'express';

// Validate incident data middleware
export const validateIncidentData = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description, severity, incidentType } = req.body;
  
  if (!title) {
    res.status(400).json({ message: 'Title is required' });
    return;
  }
  if(!description){
    res.status(400).json({ message: 'Description is required' });
    return;
  }
  if (severity && !['low', 'medium', 'high'].includes(severity)) {
    res.status(400).json({ message: 'Severity must be low, medium, or high' });
    return;
  }
  if (!incidentType) {
    res.status(400).json({ message: 'Incident type is required' });
    return;
  }
  if (!['bias', 'hallucination', 'security_breach', 'performance_issue', 'ethical_concern', 'other'].includes(incidentType)) {
    res.status(400).json({ message: 'Invalid incident type' });
    return;
  }
  
  next();
};

// Handle invalid MongoDB ID format middleware  
export const validateObjectId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    res.status(400).json({ message: 'Invalid incident ID format' });
    return;
  }
  
  next();
};