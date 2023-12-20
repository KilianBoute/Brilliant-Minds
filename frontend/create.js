document
  .getElementById("ideaForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    // Create options for the fetch request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    };

    try {
      // Send data to the server
      const response = await fetch("http://localhost:3000/create", options);

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        // Handle error responses
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  });
