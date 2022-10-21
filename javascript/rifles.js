import { cardButtonFunction , renderItemsCards } from "./commons.js";

/* SECTION RIFLES */
/* Section AK */
let containerAk = document.getElementById("container-ak");
const getAk = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderItemsCards(data, "rifles", 0, "ak", containerAk);
};

/* Section AWP */

let containerAwp = document.getElementById("container-awp");

const getAwp = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderItemsCards(data, "rifles", 0, "awp", containerAwp)
};

/* Section M4A1-S */
let containerM4a1s = document.getElementById("container-m4a1s");
const getM4a1s = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderItemsCards(data, "rifles", 0, "m4a1-s", containerM4a1s)
};

/* Section M4A4 */
let containerM4a4 = document.getElementById("container-m4a4");
const getM4a4 = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderItemsCards(data, "rifles", 0, "m4a4", containerM4a4);
};

/* Section Otros */
let containerOtros = document.getElementById("container-otros");
const getOtros = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();
    renderItemsCards(data, "rifles", 0, "otros", containerOtros)
};

getAk();
getAwp();
getM4a1s();
getM4a4();
getOtros();

