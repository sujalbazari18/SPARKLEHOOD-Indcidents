import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    incidentType: {
        type: String,
        enum: ['bias', 'hallucination', 'security_breach', 'performance_issue', 'ethical_concern', 'other'],
        required: true,
    },
    affectedSystems: {
        type: [String],
        default: [],
    },
    impactAssessment: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['reported', 'investigating', 'mitigated', 'resolved', 'closed'],
        default: 'reported',
    },
    resolutionNotes: {
        type: String,
        default: '',
    },
    reportedBy: {
        type: String,
        default: 'anonymous',
    }
}, {
    timestamps: true
});

export default mongoose.model('Incident', incidentSchema);