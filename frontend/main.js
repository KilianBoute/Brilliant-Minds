(async () => {
  const response = await fetch("http://localhost:3000/show-ideas");
  const data = await response.json();
  console.log(data);
})();
