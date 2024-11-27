export async function createSession(requestToken) {
  const { baseURL, defaultHeaders } = this;

  const url = `${baseURL}/authentication/session/new`;

  const response = await fetch(url, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      request_token: requestToken,
    }),
  });

  const body = await response.json();

  if (!response.ok) {
    return Promise.reject({ body, response });
  }

  return Promise.resolve({ body, response });
}
