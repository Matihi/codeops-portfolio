export class ApiError extends Error {
  constructor(status, data) {
    super(`HTTP:${status}. Failed to fetch data`);
    this.name = this.constructor.name;
    this.data = data;
    this.status = status;
  }
}

export const getData = async (url) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": `${import.meta.env.VITE_API_TOKEN}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new ApiError(res.status, data);
  }
  return data;
};
