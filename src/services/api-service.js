import HttpMethod from '../constants/http-method';
import ContentType from '../constants/content-type';

function getAuthToken() {
  const token = localStorage.getItem(
    `@@auth0spajs@@::${process.env.REACT_APP_AUTH0_CLIENT_ID}::default::openid profile email`
  );

  const parsedToken = JSON.parse(token);

  return parsedToken.body.id_token;
}

class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(url) {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: HttpMethod.GET,
      headers: {
        Authorization: getAuthToken(),
      }
    });

    if (!response.ok) {
      throw Error(response.status);
    }

    return response.json();
  }

  async post(url, body) {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: HttpMethod.POST,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': ContentType.APPLICATION_JSON,
      },
    });

    if (!response.ok) {
      throw Error(response.status);
    }

    return response.json();
  }

  async delete(url) {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: HttpMethod.DELETE,
      headers: {
        Authorization: getAuthToken(),
      }
    });

    if (!response.ok) {
      throw Error(response.status);
    }

    return response.json();
  }

  async put(url, body) {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: HttpMethod.PUT,
      body: JSON.stringify(body),
      headers: { 'Content-Type': ContentType.APPLICATION_JSON },
    });

    if (!response.ok) {
      throw Error(response.status);
    }

    return response.json();
  }
}

const apiService = new ApiService(process.env.REACT_APP_API_URL);

export default apiService;
