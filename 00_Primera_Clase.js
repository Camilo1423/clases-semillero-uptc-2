// Primitive Types
const nombre = "Andrés Roa";
const age = 25;
const isStudent = true;
// No Primitive Types
const birthday = new Date("2000-11-02");
const hobbies = ["programar", "leer", "correr"];
const favoriteFood = {
  breakfast: "Café",
  lunch: "Hamburguesa",
  dinner: "Pizza",
};

const nombre2 = "Andrés Roa";
const age2 = 25;
const isStudent2 = true;
// No Primitive Types
const birthday2 = new Date("2000-11-02");
const hobbies2 = ["programar", "leer", "correr"];
const favoriteFood2 = {
  breakfast: "Café",
  lunch: "Hamburguesa",
  dinner: "Pizza",
};

// console.log(typeof name);
// console.log(typeof age);
// console.log(typeof isStudent);
// console.log(birthday instanceof Date ? "Es un objeto Date" : "No es un objeto Date");
// console.log(Array.isArray(hobbies) ? "Es un array" : "No es un array");
// console.log(typeof favoriteFood);

function printInfo(nombre, age, isStudent, birthday, hobbies, favoriteFood) {
  console.log("========= MI INFORMACIÓN =========");
  console.log("Nombre: ", nombre.toUpperCase());
  console.log("Edad: ", age);
  console.log("Es estudiante: ", isStudent ? "Sí" : "No");
  console.log(
    "Fecha de nacimiento: ",
    birthday.getFullYear() +
      " - " +
      birthday.getMonth() +
      " - " +
      birthday.getDate(),
  );
  console.log("Hobbies: ", hobbies.join(" | "));
  console.log(
    "Comida favorita: ",
    `Desayuno: ${favoriteFood.breakfast}, Almuerzo: ${favoriteFood.lunch}, Cena: ${favoriteFood.dinner}`,
  );
  console.log("========= FIN DE MI INFORMACIÓN =========");
}

printInfo(nombre, age, isStudent, birthday, hobbies, favoriteFood);
