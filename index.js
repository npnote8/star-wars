const ResourceNames = {
  PEOPLE: "people",
  PLANETS: "planets",
  FILMS: "films",
  VEHICLES: "vehicles",
  STARSHIPS: "starships",
  SPECIES: "species",
};

getUrl = (resourceName) => {
  let url = "";
  switch (resourceName) {
    case ResourceNames.PEOPLE:
      url = "details.html?people=";
      break;
    case ResourceNames.PLANETS:
      url = "details.html?planets=";
      break;
    case ResourceNames.FILMS:
      url = "details.html?films=";
      break;
    case ResourceNames.VEHICLES:
      url = "details.html?vehicles=";
      break;
    case ResourceNames.STARSHIPS:
      url = "details.html?starships=";
      break;
    case ResourceNames.SPECIES:
      url = "details.html?species=";
      break;
  }

  return url;
};

createRow = (object, resourceName) => {
  const url = getUrl(resourceName) + object.uid;

  return `<p><a class='text-white fs-5 text-decoration-none' href=${url}>${
    object.name || object.properties.title
  }</a></p>`;
};

function createTable(arr, resourceName) {
  let column = document.createElement("div");
  column.className = "col-sm-2";
  column.innerHTML = `<h2 class='text-warning'>${
    resourceName[0].toUpperCase() + resourceName.slice(1)
  }</h2>`;
  for (const item of arr) {
    column.innerHTML += createRow(item, resourceName);
  }

  const myDiv = document.querySelector(".row");
  myDiv.append(column);
}

resourceList = async (resource) => {
  const response = await fetch(`https://www.swapi.tech/api/${resource}`);
  const { results, result } = await response.json();
  console.log(results, result);
  return results || result;
};

getAllresources = async () => {
  return Promise.allSettled([
    resourceList(ResourceNames.PEOPLE),
    resourceList(ResourceNames.PLANETS),
    resourceList(ResourceNames.FILMS),
    resourceList(ResourceNames.VEHICLES),
    resourceList(ResourceNames.STARSHIPS),
    resourceList(ResourceNames.SPECIES),
  ]).then((results) => {
    return results.reduce((acc, resource, index) => {
      acc[Object.values(ResourceNames)[index]] = resource.value;
      return acc;
    }, {});
  });
};

getAllresources().then((result) => {
  createTable(result.people, ResourceNames.PEOPLE);
  createTable(result.films, ResourceNames.FILMS);
  createTable(result.vehicles, ResourceNames.VEHICLES);
  createTable(result.species, ResourceNames.SPECIES);
  createTable(result.starships, ResourceNames.STARSHIPS);
  createTable(result.planets, ResourceNames.PLANETS);
});
