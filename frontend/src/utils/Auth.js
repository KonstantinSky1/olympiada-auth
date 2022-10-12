const BASE_URL = 'http://localhost:3001';

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(res);
}

export function register(email, password, name) {
  return fetch(`${BASE_URL}/signup`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
    }
  )
    .then(checkResponse);
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
  )
    .then(checkResponse)
    .then((res) => {
      if (!res.token) return;

      localStorage.setItem('jwt', res.token);
    });
}

export function getToken(token) {
  return fetch(`${BASE_URL}/users/me`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
  )
    .then(checkResponse);
}

export function getUserMe(token) {
  return fetch(`${BASE_URL}/users/me`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
  )
    .then(checkResponse);
}