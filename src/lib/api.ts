const API_URL = 'https://course-backend-u9xp.onrender.com/api';

function getToken() {
    return localStorage.getItem('token');
}

export const api = {
    async get<T = any>(endpoint: string): Promise<T> {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
            }
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        return response.json() as Promise<T>;
    },

    async post<T = any>(endpoint: string, body: any): Promise<T> {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || `API error: ${response.status}`);
        }
        return data as T;
    },

    async put<T = any>(endpoint: string, body: any): Promise<T> {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
            },
            body: JSON.stringify(body)
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error((data && data.error) || `API error: ${response.status}`);
        }
        return data as T;
    },

    async del(endpoint: string): Promise<any> {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
            }
        });

        if (response.status === 204) return null;
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error((data && data.error) || `API error: ${response.status}`);
        }
        return data;
    }
};
