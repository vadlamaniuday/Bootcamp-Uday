export async function fetchData() {
  const response = await fetch("/data.json");
  const data = await response.json();
  console.log("Loaded data:", data);
  return data;
}
