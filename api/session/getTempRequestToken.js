export async function getTempRequestToken() {
  const { baseURL, defaultHeaders } = this;

  const url = `${baseURL}/authentication/token/new`;

  const response = await fetch(url, {
    method: "GET",
    headers: defaultHeaders,
  });

  const body = await response.json();

  if (!response.ok) {
    return Promise.reject({ body, response });
  }
  return Promise.resolve({ body, response });
}
