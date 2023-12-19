console.log("+++++");

const getData = async () => {
  const response = await fetch("http://localhost:3000/ideas");
  const data = await response.json();
  console.log("---------------");
  console.log(data);
};

getData();
