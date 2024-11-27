export async function deleteSession({ sessionId }) {
  const { baseURL, defaultHeaders } = this;

  const url = `${baseURL}/authentication/session`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: defaultHeaders,
    body: JSON.stringify({
      session_id: sessionId,
    }),
  });

  const body = await response.json();

  if (!response.ok) {
    return Promise.reject({ body, response });
  }

  return Promise.resolve({ body, response });
}
