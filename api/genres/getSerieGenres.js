export async function getSerieGenres(options = {}) {
  const { baseURL, defaultLanguage, defaultHeaders } = this;

  const urlParams = new URLSearchParams({
    language: defaultLanguage,
    ...options,
  });

  const url = `${baseURL}/genre/tv/list?${urlParams}`;

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
