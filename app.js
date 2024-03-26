const searchField = document.querySelector(".search-field");

const search = document.querySelector(".search-icon");

search.addEventListener("click", async () => {
  const weather = await getWeatherData(searchField.value);
  console.log(weather);
  const content = document.querySelector(".content");
  content.innerHTML = "";
  displayWeatherData(weather);
});

async function getWeatherData(cityName) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=13e4924d2f3c4f13a8c110148242503&q=${cityName}`
    );

    if (!response) {
      throw new Error("invalid response from server");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch weather data`);
  }
}

const displayWeatherData = (data) => {
  const content = document.querySelector(".content");
  const dataContainer = document.createElement("div");
  dataContainer.classList.add("dataContainer");

  const name = document.createElement("p");
  const celcius = document.createElement("p");
  const farenheit = document.createElement("p");
  const region = document.createElement("p");
  const country = document.createElement("p");
  const condition = document.createElement("p");
  const conditionIcon = document.createElement("img");
  conditionIcon.src = `https:${data.current.condition.icon}`;

  farenheit.textContent = `${data.current.temp_f}°F`;
  celcius.textContent = `${data.current.temp_c}°C`;
  country.textContent = data.location.country;
  region.textContent = data.location.region;
  name.textContent = data.location.name;
  condition.textContent = data.current.condition.text;

  if (data.current.is_day) {
    content.style.backgroundImage =
      "linear-gradient(rgb(255, 245, 230), rgb(253, 188, 46))";
  } else {
    content.style.backgroundImage =
      "linear-gradient(rgb(30, 35, 36), rgb(0, 70, 110))";
  }
  dataContainer.appendChild(name);
  dataContainer.appendChild(region);
  dataContainer.appendChild(country);
  dataContainer.appendChild(celcius);
  dataContainer.appendChild(farenheit);
  dataContainer.appendChild(condition);
  dataContainer.appendChild(conditionIcon);

  content.appendChild(dataContainer);
};
