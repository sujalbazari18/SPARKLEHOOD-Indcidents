import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Incident from './models/incidents.models';
import connectDB from './db';

// Load environment variables first
dotenv.config();

// Sample incident data
const sampleIncidents = [
  {
    title: 'AI Bias in Recommendation System',
    description: 'Our recommendation algorithm shows gender bias in job suggestions',
    severity: 'high',
    incidentType: 'bias',
    affectedSystems: ['Recommendation Engine', 'Job Board API'],
    impactAssessment: 'High impact - affects career opportunities for users',
    status: 'investigating',
    resolutionNotes: 'Team is retraining the model with balanced dataset',
    reportedBy: 'data_ethics_team'
  },
  {
    title: 'ChatBot Hallucination Issue',
    description: 'Customer support AI is generating factually incorrect information about our products',
    severity: 'medium',
    incidentType: 'hallucination',
    affectedSystems: ['Customer Support Chatbot'],
    impactAssessment: 'Medium impact - customers receiving incorrect information',
    status: 'mitigated',
    resolutionNotes: 'Implemented fact-checking layer before responses',
    reportedBy: 'customer_support'
  },
  {
    title: 'Data Privacy Breach',
    description: 'Model accidentally included sensitive user data in its responses',
    severity: 'high',
    incidentType: 'security_breach',
    affectedSystems: ['Personal Assistant AI'],
    impactAssessment: 'High impact - potential legal implications',
    status: 'resolved',
    resolutionNotes: 'Enhanced data filtering implemented, affected users notified',
    reportedBy: 'security_team'
  },
  {
    title: 'Model Latency Issues',
    description: 'Image generation API experiencing significant slowdowns during peak hours',
    severity: 'medium',
    incidentType: 'performance_issue',
    affectedSystems: ['Image Generation API', 'CDN'],
    impactAssessment: 'Medium impact - affects user experience',
    status: 'investigating',
    reportedBy: 'devops'
  },
  {
    title: 'Ethical Concern in Content Moderation',
    description: 'AI content filter showing cultural bias in moderation decisions',
    severity: 'high',
    incidentType: 'ethical_concern',
    affectedSystems: ['Content Moderation System'],
    impactAssessment: 'High impact - affects content visibility unequally',
    status: 'reported',
    reportedBy: 'ethics_committee'
  }
];

// Seed function
const seedDatabase = async () => {
  let connection;
  
  try {
    // Connect to database with await to ensure connection is established
    connection = await connectDB();
    console.log('Database connected successfully for seeding');
    
    // Clear existing data
    console.log('Clearing existing incidents...');
    const deleteResult = await Incident.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing incidents`);
    
    // Insert sample data
    console.log('Inserting new incidents...');
    const createdIncidents = await Incident.insertMany(sampleIncidents);
    console.log(`Added ${createdIncidents.length} incidents to the database`);
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    // Close database connection
    if (connection) {
      console.log('Closing database connection...');
      await mongoose.connection.close();
      console.log('Database connection closed');
    }
  }
};

// Run the seed function and handle any uncaught errors
seedDatabase().catch(err => {
  console.error('Unhandled error in seed process:', err);
  process.exit(1);
}); 