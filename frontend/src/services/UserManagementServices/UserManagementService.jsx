const api_endpoint = import.meta.env.VITE_API_ENDPOINT;
import md5 from "md5";

export const signIn = async (user_id, password) => {
    const passwordHash = md5(password);

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                user_id: user_id,
                password: passwordHash
            })
    }

    try {
        const response = await fetch(`${api_endpoint}/users/sign-in`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error signing in:');
        return null;
    }

}

export const signUp = async (user_id, password) => {
    const passwordHash = md5(password);

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                user_id: user_id,
                password: passwordHash
            })
    }

    try {
        const response = await fetch(`${api_endpoint}/users/sign-up`, options);
        const subscribeResponse = await fetch(`${api_endpoint}/users/subscribe`, options);

        const result = subscribeResponse.json();
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error signing up:');
        return null;
    }

}

export const DeleteAccount = async (user_id) => {

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await fetch(`${api_endpoint}/users/${user_id}`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting account:');
        return null;
    }

}

export const isLoggedIn = () => {
    const user = localStorage.getItem('applifyUser');
    if(user){
        return true;
    }else{
        return false;
    }
}