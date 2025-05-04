const BASE_URL = "http://localhost:3000/api";

export const getAll = async (resource) => {
  const res = await fetch(`${BASE_URL}/${resource}`);
  return res.json();
};

export const create = async (resource, data) => {
  const res = await fetch(`${BASE_URL}/${resource}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const update = async (resource, id, data) => {
  const res = await fetch(`${BASE_URL}/${resource}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const remove = async (resource, id) => {
  await fetch(`${BASE_URL}/${resource}/${id}`, { method: 'DELETE' });
};
