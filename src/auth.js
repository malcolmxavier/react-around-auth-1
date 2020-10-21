export const BASE_URL = 'https://api.nomoreparties.co';

export const register = (password, email) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then((response) => response.json())
  .then((res) => res)
  .catch((err) => console.log(err));
export const authorize = (password, email) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then(((response) => response.json()))
  .then((data) => {
    if (data.user) {
      localStorage.setItem('jwt', data.jwt);
      return data;
    }
  })
  .catch((err) => console.log(err));

export const checkToken = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => data);
