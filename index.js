const countryList = document.getElementById("country-list");
const sortBtn = document.getElementById("sort-btn");
const sortBy = document.getElementById("sort-by");

sortBtn.addEventListener("click", () => {
    fetchCountryData(sortBy.value);
});

async function fetchCountryData(sortOrder = "asc") {
    try {
        const response = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?sort=population&order=${sortOrder}`);
        if (!response.ok) {
            throw new Error("Failed to fetch country data");
        }
        const data = await response.json();
        displayCountries(data);
    } catch (error) {
        console.error('Error fetching country data:', error);
    }

}

function displayCountries(responseData) {
    const countries = responseData.data;
    console.log("Displaying countries:", countries);
    countryList.innerHTML = "";
    countries.forEach(country => {
      const countryCard = document.createElement("div");
      countryCard.classList.add("country-card");

      const countryName = document.createElement("h3");
      countryName.innerText = country.country;

      const countryPopulation = document.createElement("h4");
      countryPopulation.innerText = `Population: ${country.population}`;

      const countryRank = document.createElement("p");
      countryRank.innerText = `Rank: ${country.Rank}`;

      countryCard.appendChild(countryName);
      countryCard.appendChild(countryPopulation);
      countryCard.appendChild(countryRank);

      countryList.appendChild(countryCard);
    });
  }


fetchCountryData();
