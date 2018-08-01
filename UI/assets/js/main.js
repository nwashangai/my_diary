const BASE_URL = 'http://localhost:3000/';

const request = (type, urlString, payload) => {
  const url = `${BASE_URL}${urlString}`;
  if (type === 'get') {
    return fetch(url, {
      method: 'GET',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cores',
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
      },
      mode: 'cores',
      credentials: 'omit',
      mode: 'cors',
      credentials: 'omit',
    }).then((res) => {
      return res.json();
    }).then((res) => {
      console.log(res);
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
      },
      mode: 'cores',
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
  request('post', 'api/v1/auth/signup/', data).then((response) => {
    if (response.status === 'error') {
      window.location.href = 'index.html';
    } else {
      loginAlert(response.message, '#6378c0');
    }
  });
}