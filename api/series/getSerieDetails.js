export async function getSerieDetails(options = {}) {
  const { baseURL, defaultLanguage, defaultHeaders } = this;
  const { id, ...restOptions } = options;

  const urlParams = new URLSearchParams({
    language: defaultLanguage,
    ...restOptions,
  });

  const url = `${baseURL}/tv/${id}?${urlParams}`;

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
