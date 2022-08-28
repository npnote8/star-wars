const ResourceNames = {
  PEOPLE: "people",
  PLANETS: "planets",
  FILMS: "films",
  VEHICLES: "vehicles",
  STARSHIPS: "starships",
  SPECIES: "species",
};

getPathValue = (url) => {
  const arr = url.split("/");
  return { param: arr[4], value: arr[5] };
};

function htmlToElements(html) {
  var template = document.createElement("template");
  template.innerHTML = html;
  return template.content.childNodes;
}

createLink = (link, text) => {
  const path = getPathValue(link);
  return `<a href="details.html?${path.param}=${path.value}" class="list-group-item list-group-item-action">${text}</a>`;
};

generateLinks = async (label, links) => {
  const anchorList = await Promise.all(
    links.map(async (link) => {
      const response = await fetch(link);
      const { title, name } = await response.json();
      const elem = createLink(link, title || name);
      return elem;
    })
  );

  const anchors = `<div class="list-group col-sm-10"> ${anchorList.join(
    ""
  )} </div>`;
  return anchors;
};

createLinkRow = async (label, links) => {
  const result = await generateLinks(label, links);
  const div = `
    <div class="row mb-3"> 
        <div class="col-sm-2 fs-5 fw-bold text-white">${
          label.toUpperCase()[0] + label.slice(1)
        }:</div> 
        ${result}
    </div>`;
  return div;
};

function generateProfile(item) {
  const entries = Object.entries(item).reduce((acc, [key, value]) => {
    if (!Array.isArray(value)) {
      const div = `
      <div class="row mb-3"> 
          <div class="col-sm-2 fs-5 fw-bold text-white text-wrap">${
            key.toUpperCase()[0] + key.slice(1)
          }:</div> 
          <div class="col text-white text-wrap">${value} 
           
          </div>
      </div>`;
      acc?.push(div);
    }
    return acc;
  }, []);
  return entries;
}

fetchData = async (params) => {
  const baseUrl = "https://swapi.dev/api";
  const [[key, value]] = Object.entries(params);
  const url = `${baseUrl}/${key}/${value}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

fetchDetails = async (params) => {
  const [[key, value]] = Object.entries(params);
  const data = await fetchData(params);
  const arr = [];
  switch (key) {
    case ResourceNames.PEOPLE:
      arr.push(...generateProfile(data));
      arr.push(await createLinkRow(ResourceNames.FILMS, data.films));
      arr.push(await createLinkRow(ResourceNames.SPECIES, data.species));
      arr.push(await createLinkRow(ResourceNames.VEHICLES, data.vehicles));
      arr.push(await createLinkRow(ResourceNames.STARSHIPS, data.starships));
      break;
    case ResourceNames.PLANETS:
      arr.push(...generateProfile(data));
      arr.push(await createLinkRow(ResourceNames.PEOPLE, data.residents));
      arr.push(await createLinkRow(ResourceNames.FILMS, data.films));
      break;
    case ResourceNames.FILMS:
      arr.push(...generateProfile(data));
      arr.push(await createLinkRow(ResourceNames.PEOPLE, data.characters));
      arr.push(await createLinkRow(ResourceNames.PLANETS, data.planets));
      arr.push(await createLinkRow(ResourceNames.STARSHIPS, data.starships));
      arr.push(await createLinkRow(ResourceNames.VEHICLES, data.vehicles));
      arr.push(await createLinkRow(ResourceNames.SPECIES, data.species));
      break;
    case ResourceNames.SPECIES:
      arr.push(...generateProfile(data));
      arr.push(await createLinkRow(ResourceNames.PEOPLE, data.people));
      arr.push(await createLinkRow(ResourceNames.FILMS, data.films));
      break;
    case ResourceNames.VEHICLES:
      arr.push(...generateProfile(data));
      arr.push(await createLinkRow(ResourceNames.PEOPLE, data.pilots));
      arr.push(await createLinkRow(ResourceNames.FILMS, data.films));
      break;
    case ResourceNames.STARSHIPS:
      arr.push(...generateProfile(data));
      arr.push(await createLinkRow(ResourceNames.PEOPLE, data.pilots));
      arr.push(await createLinkRow(ResourceNames.FILMS, data.films));
      break;
  }
  return arr;
};

window.onload = (e) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  console.log("params", params);
  const myDiv = document.getElementById("details");
  fetchDetails(params, myDiv).then((results) => {
    const childNodes = htmlToElements(results.join(""));
    myDiv.append(...childNodes);
  });
};
