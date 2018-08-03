const BASE_URL = 'http://localhost:3000/api/v1/';

const request = (type, urlString, payload = {}) => {
  const url = `${BASE_URL}${urlString}`;
  if (type === 'get') {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('token-key') || null,
      },
      mode: 'cors',
      credentials: 'omit',
    }).then((res) => {
      return res.json();
    }).then((res) => {
      return res;
    }, (error) => {
      throw error;
    });
  }
  if (type === 'post') {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('token-key') || null,
      },
      mode: 'cores',
      credentials: 'omit',
      mode: 'cors',
      credentials: 'omit',
    }).then((res) => {
      return res.json();
    }).then((res) => {
      return res;
    }, (error) => {
      throw error;
    });
  }
  if (type === 'put') {
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('token-key') || null,
      },
      mode: 'cors',
      credentials: 'omit',
    }).then((res) => {
      return res.json();
    }).then((res) => {
      return res;
    }, (error) => {
      throw error;
    });
  }
  return { status: 'error', message: 'specify a valid request method' };
}

const loadData = () => {
  return request('get', 'entries/').then((response) => {
    if (response.status === 'error') {
      window.location.href = 'index.html';
    } else {
      return response.entries;
    }
  });
}
const loadUser = () => {
  return request('get', 'user/').then((response) => {
    if (response.status === 'error') {
      window.location.href = 'index.html';
    } else {
      return response.entry;
    }
  });
}