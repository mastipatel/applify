const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  application_id: { type: String },
  company_name: { type: String },
  job_role: { type: String },
  application_deadline: { type: Number },
  application_status: { type: String },
  user_id: { type: String },
  notifications_active: { type: Boolean },
}, { collection: 'job-applications' });

const JobApplication = mongoose.model('job-applications', jobSchema, 'job-applications');

module.exports = JobApplication;
