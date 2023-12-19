const JobApplication = require("../models/JobModel.js");
const { uuid } = require('uuidv4');

exports.CreateApplication = async (req, res) => {
    const id = uuid();
    const { company_name, job_role, application_deadline, application_status, user_id, notifications_active } = req.body;

    try {
        const newApplication = new JobApplication({
            application_id: id,
            company_name: company_name,
            job_role: job_role,
            application_deadline: application_deadline,
            application_status: application_status,
            user_id: user_id,
            notifications_active: notifications_active
        });

        newApplication.save()
            .then((savedApplication) => {
                return res.status(200).json({ success: true, application_id: id });
            })
            .catch((err) => {
                return res.status(500).json({ success: false, error: 'Database error' });
            });

    } catch (error) {
        return res.status(500).json({ success: false, error: 'Failed to add application' });
    }
}

exports.EditApplication = async (req, res) => {

    const { application_id, company_name, job_role, application_deadline, application_status, user_id, notifications_active } = req.body;

    try {
        const result = await JobApplication.findOneAndUpdate({ application_id: application_id }, {
            $set: {
                application_id: application_id,
                company_name: company_name,
                job_role: job_role,
                application_deadline: application_deadline,
                application_status: application_status,
                user_id: user_id,
                notifications_active: notifications_active
            }
        });

        return res.status(200).json({ success: true, application_id: application_id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: 'Failed to edit application' });
    }
}

exports.DeleteApplication = async (req, res) => {
    const application_id = req.params.application_id;

    try {
        const application = await JobApplication.findOne({ application_id: application_id });
        if (application === null) {
            return res.status(404).json({ success: false, error: "Application does not exist!" });
        } else {
            await JobApplication.deleteOne({ application_id: application_id });
            return res.status(200).json({ success: true, application_id: application_id });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

exports.getApplicationByEmail = async (req, res) => {
    const user_id = req.query.user_id;

    try {
        const jobApplications = await JobApplication.find({ user_id: user_id });

        return res.status(200).json(jobApplications);

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch' });
    }
}