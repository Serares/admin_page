interface HeadersData {
  [key: string]: string;
}

export default function headers() {
  const items: HeadersData = { 'Content-Type': 'application/json' };
  const token = window.localStorage.getItem('adminToken');
  if (token) {
    items.Authorization = `Bearer ${token}`;
  }
  return items;
}
