console.log("+++++");

const getData = async () => {
  const response = await fetch("http://localhost:3000/ideas");
  const data = await response.json();
  console.log("---------------");
  console.log(data);
  const ideaContainer = document.querySelector("#idea-container");
  data.forEach((element) => {
    const ideaCard = document.createElement("div");
    const ideaTitle = document.createElement("p");
    ideaTitle.textContent = element.title;
    const ideaDescr = document.createElement("p");
    ideaDescr.textContent = element.description;
    const ideaTime = document.createElement("p");
    ideaTime.textContent = element.created_at;
    const ideaDelete = document.createElement("button");
    ideaDelete.textContent = "delete";
    ideaDelete.addEventListener("click", () => {
      deleteIdea(element.id);
    });
    ideaCard.appendChild(ideaTitle);
    ideaCard.appendChild(ideaDescr);
    ideaCard.appendChild(ideaTime);
    ideaCard.appendChild(ideaDelete);
    ideaContainer.appendChild(ideaCard);
  });
};

const deleteIdea = async (ideaId) => {
  const response = await fetch(`http://localhost:3000/ideas/${ideaId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // Assume you have a function to refresh the displayed ideas
    refreshIdeas();
  } else {
    console.error(`Error deleting idea with ID ${ideaId}`);
  }
};

const refreshIdeas = () => {
  const ideaContainer = document.querySelector("#idea-container");
  // Clear the existing ideas
  while (ideaContainer.firstChild) {
    ideaContainer.removeChild(ideaContainer.firstChild);
  }
  // Fetch and display the updated ideas
  getData();
};

getData();
