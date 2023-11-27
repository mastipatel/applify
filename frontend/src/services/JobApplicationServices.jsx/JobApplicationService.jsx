const api_endpoint = import.meta.env.VITE_API_ENDPOINT;

export const createApplication = async (company_name, job_role, application_deadline, application_status, user_id, notifications_active) => {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                company_name: company_name,
                job_role: job_role,
                application_deadline: application_deadline,
                application_status: application_status,
                user_id: user_id,
                notifications_active: notifications_active
            })
    }

    try {
        const response = await fetch(`${api_endpoint}/job-application/create`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating application:');
        return null;
    }

}

export const editApplication = async (application_id,company_name, job_role, application_deadline, application_status, user_id, notifications_active) => {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                application_id: application_id,
                company_name: company_name,
                job_role: job_role,
                application_deadline: application_deadline,
                application_status: application_status,
                user_id: user_id,
                notifications_active: notifications_active
            })
    }

    try {
        const response = await fetch(`${api_endpoint}/job-application/edit`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error editing application:');
        return null;
    }

}

export const deleteApplication = async (application_id) => {

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await fetch(`${api_endpoint}/job-application/${application_id}`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating application:');
        return null;
    }

}

export const getbyUserID = async (user_id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await fetch(`${api_endpoint}/job-application?user_id=${user_id}`, options);

        const data = await response.json();
        if(data?.error){
            return [];
        }
        return data;
    } catch (error) {
        console.error('Error getting applications for the user:', error);
        return [];
    }
}