const API_URL = 'http://localhost:5000/api';

function getToken() {
    return localStorage.getItem('token');
}

export const api = {
    async get<T>(endpoint: string): Promise<T> {
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

    async post<T>(endpoint: string, body: unknown): Promise<T> {
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

    async put<T>(endpoint: string, body: unknown): Promise<T> {
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

    async del(endpoint: string): Promise<unknown> {
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
