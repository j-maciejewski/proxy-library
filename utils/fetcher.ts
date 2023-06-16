const fetcher = async <T>(
  url: string,
): Promise<{ data: T; error: null } | { data: null; error: Error }> => {
  return await fetch(url).then(async (response) => {
    try {
      if (!response.ok) {
        return { data: null, error: new Error(response?.statusText) };
      }

      const data = (await response.json()) as T;

      return { data, error: null };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { data: null, error: new Error(error.message) };
      }

      return { data: null, error: new Error("Unknown error") };
    }
  });
};

export { fetcher };
