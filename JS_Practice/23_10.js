async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(response);
  } catch (error) {
    throw error;
  }
}

getData("https://jsonplaceholder.typicode.com/");
