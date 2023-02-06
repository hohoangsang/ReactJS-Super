import sum from "./util";
import "./styles/style.css";
import "./styles/style.scss";
import "core-js/actual/object/values";
import "core-js/actual/promise";
import domImageAndPdf from "./dom";

domImageAndPdf()

console.log(sum(100, 4));

// ES6 Spread Operator
const person = { name: "Sang" };
const personClone = { ...person };
console.log("personClone", personClone);

// ES7 Object.values
console.log("Object.values", Object.values(personClone));


// Promise async await
const handle = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve("Sang hoc webpack");
  }, 1000);
});

(async () => {
  try {
    const newNum = await handle();
    console.log("values: ", newNum);
  } catch (error) {
    console.log("error: ", error)
  }
})();
