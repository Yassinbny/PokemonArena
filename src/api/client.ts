export interface ApiOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export async function callApi<T>(
  url: string,
  options: ApiOptions = {}
): Promise<T> {
  const { params, headers, ...rest } = options;

  const query = params
    ? "?" + new URLSearchParams(params as Record<string, string>).toString()
    : "";

  const response = await fetch(url + query, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
