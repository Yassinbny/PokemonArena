export async function callApi<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const { headers, ...rest } = options;

  const response = await fetch(url, {
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
