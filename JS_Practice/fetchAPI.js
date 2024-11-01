async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // const value = data.filter((obj) => obj.id === 77);
    const value = data.map((obj) => obj.userId * 2);
    // const value = data.reduce((obj1, obj2) => {
    //   if (obj1.id > obj2.id) return obj1;
    //   else return obj2;
    // });
    console.log(value);
  } catch (error) {
    throw error;
  } finally {
    console.log("i can do.");
  }
}

getData("https://jsonplaceholder.typicode.com/posts");
