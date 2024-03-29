let errorCountAmountOfTryies = 1;

const dotSection = document.querySelector("#dot-section");

// TIME
const time = new Date();
const year = time.getFullYear();
let month = time.getMonth();
let date = time.getDate();
let hour = time.getHours();

const monthFormat = month < 10 ? (month = `0${month + 1}`) : month + 1;
const hourFormat = hour < 10 ? (hour = `0${hour}`) : hour;
const dateFormat = date < 10 ? (date = `0${date}`) : date;
let dateOfTime = `${year}-${monthFormat}-${dateFormat}T${hourFormat}`;
console.log(dateOfTime);

export async function getData() {
  const api = `https://json-server-rest-grud.herokuapp.com/values`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    // RETRY FETCH
    if (errorCountAmountOfTryies < 3) {
      getData();
      errorCountAmountOfTryies++;
    }
    console.log("whoops, something went wrong!", error);
  }
}

let data = await getData();

export function showdata() {
  data.forEach(element => {
    let hold = element.Team;

    if (element.StartDate.substring(0, 13) === dateOfTime) {
      switch (hold) {
        case "gmg010122":
          if (element.Room !== "") {
            element.Color = "lightblue";
            createElementDiv(element.Room, element.Color);
          }
          break;
        case "gwe010122":
          if (element.Room !== "") {
            element.Color = "#fa4bbc";
            createElementDiv(element.Room, element.Color);
          }
          break;
        case "ikp030422":
          if (element.Room !== "") {
            element.Color = "black";
            createElementDiv(element.Room, element.Color);
          }
          break;
        case "h0mg010122f":
          if (element.Room !== "") {
            element.Color = "orange";
            createElementDiv(element.Room, element.Color);
          }
          break;
        case "h0gr010122f":
          if (element.Room !== "") {
            element.Color = "turquoise";
            createElementDiv(element.Room, element.Color);
          }
          break;
        case "h2gr020122":
          if (element.Room !== "") {
            element.Color = "yellow";
            createElementDiv(element.Room, element.Color);
          }
          break;
        case "iiw030522":
          if (element.Room !== "") {
            element.Color = "green";
            createElementDiv(element.Room, element.Color);
          }
          break;
        case "ild030422":
          if (element.Room !== "") {
            element.Color = "brown";
            createElementDiv(element.Room, element.Color);
          }
          break;
        case "ild030522":
          if (element.Room !== "") {
            element.Color = "white";
            createElementDiv(element.Room, element.Color);
          }
          break;
        case "ggr010122":
          if (element.Room !== "") {
            element.Color = "peru";
            createElementDiv(element.Room, element.Color);
          }
          break;
        case "h1we080121":
          if (element.Room !== "") {
            element.Color = "purple";
            createElementDiv(element.Room, element.Color);
          }
          break;

        case "iiw030422":
          if (element.Room !== "") {
            element.Color = "blue";
            createElementDiv(element.Room, element.Color);
          }
          break;
        default:
          console.log("Hold er ikke på Skolen");
          break;
      }
    }
  });
}
function createElementDiv(room, color) {
  let div = document.createElement("div");
  div.classList.add("dot");
  div.setAttribute("id", `${room}`);
  div.style.backgroundColor = `${color}`;
  div.style.boxShadow = `0px 0px 10px 0.2px ${color}`;
  dotSection.appendChild(div);
}

let newscontainer1 = document.getElementById("news1");

let news = "";

async function getNewsData() {
  const api = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    // RETRY FETCH
    if (errorCountAmountOfTryies < 3) {
      getNewsData();
      errorCountAmountOfTryies++;
    }
    console.log("whoops, something went wrong!", error);
  }
}
let newsData = await getNewsData();

export function getNews() {
  newsData.items.forEach(element => {
    console.log(element.title);
    news += `<span>${element.title}</span>`;
  });
  newscontainer1.innerHTML = news;
}
