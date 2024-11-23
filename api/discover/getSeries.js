export async function getSeries(options = {}) {
  const { baseURL, defaultLanguage, defaultHeaders } = this;

  const urlParams = new URLSearchParams({
    language: defaultLanguage,
    ...options,
    page: options.page || 1,
  });

  const url = `${baseURL}/discover/tv?${urlParams}`;

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
