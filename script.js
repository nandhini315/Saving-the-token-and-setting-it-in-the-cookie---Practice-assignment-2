let token = null;

async function getToken() {
  const res = await fetch('http://localhost:3000/generate-token');
  const data = await res.json();
  token = data.token;

  localStorage.setItem('jwtToken', token);
  document.getElementById('token-display').innerText = `Token: ${token}`;
}

async function verifyToken() {
  const token = localStorage.getItem('jwtToken');

  const res = await fetch('http://localhost:3000/verify-token', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();
  document.getElementById('verify-result').innerText = JSON.stringify(data);
}

async function checkAccess() {
  const token = localStorage.getItem('jwtToken');

  const res = await fetch('http://localhost:3000/verify-token', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();
  document.getElementById('access-result').innerText = JSON.stringify(data);
}
