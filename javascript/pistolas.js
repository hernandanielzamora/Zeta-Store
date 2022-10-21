import { cardButtonFunction , renderItemsCards, renderFiller } from "./commons.js";

/* Section "Pistolas" DOM */
/* Section Dks */
let containerDk = document.getElementById("container-dk");

const getDk = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderItemsCards(data, "pistolas", 0, "dk", containerDk);
};

/* Section P250 */
let containerP250 = document.getElementById("container-p250");
const getP250 = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderItemsCards(data, "pistolas", 0, "p250", containerP250);
};

/* Section USP */
let containerUsp = document.getElementById("container-usp");
const getUsp = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderItemsCards(data, "pistolas", 0, "usp", containerUsp);
};

/* Section Five Seven */
let containerFiveSeven = document.getElementById("container-fiveseven");
const getFiveSeven = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderFiller(data, "filler", containerFiveSeven);
};

/* Section Glock */
let containerGlock = document.getElementById("container-glock");
const getGlock = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderFiller(data, "filler", containerGlock);
};

/* Section P2000 */
let containerP2000 = document.getElementById("container-p2000");
const getP2000 = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderFiller(data, "filler", containerP2000);
};



/* Section TEC-9 */
let containerTec9 = document.getElementById("container-tec9");
const getTec9 = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderFiller(data, "filler", containerTec9);
};



/* Section CZ75 */
let containerCz75 = document.getElementById("container-cz75");
const getCz75 = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderItemsCards(data, "pistolas", 0, "cz75", containerCz75)
};

getDk();
getP250();
getUsp();
getFiveSeven();
getGlock();
getP2000();
getTec9();
getCz75();





