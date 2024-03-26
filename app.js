const searchField = document.querySelector(".search-field");

const search = document.querySelector(".search-icon");

search.addEventListener("click", () => {
  let name = searchField.value;
  searchField.value = "";
  console.log(name);
});
