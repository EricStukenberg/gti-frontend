const API_ROOT = `http://localhost:3001`;

const token = () => localStorage.getItem("token");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accepts: "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    Authorization: token()
  };
};



const login = data => {
  return fetch(`${API_ROOT}/auth`, {
    method: "POST",
    // mode: "no-cors",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    // mode: "no-cors",
    headers: headers()
  }).then(res => {
    return res.json();
  });
};

export const api = {
  auth: {
    login,
    getCurrentUser
  }
};