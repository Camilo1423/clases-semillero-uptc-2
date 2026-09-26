// write in english
// Import Node's built-in "readline" module. It lets us read text that the
// user types into the terminal (standard input) line by line.
const readline = require("node:readline");
const path = require("node:path");
const fs = require("node:fs");

const attendanceListPath = path.join(__dirname, "list.json");

if (!fs.existsSync(attendanceListPath)) {
  fs.writeFileSync(attendanceListPath, "");
}

// Create a readline "interface" connected to the keyboard (process.stdin)
// and the screen (process.stdout). This object (rl) is what we use to ask
// questions and receive answers in the console.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// input(question): asks the user a question in the terminal and waits for
// their answer. It wraps rl.question in a Promise so we can use "await" and
// write the code in a clean, top-to-bottom style instead of nested callbacks.
// It returns the text the user typed.
function input(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function clearScreen() {
  console.clear();
}

const AttendanceList = [];

// validateData(...): checks that the four values the user typed are correct.
// It collects every problem into an "errors" array, prints all of them if
// there is at least one, and returns a boolean:
//   - true  -> the data is valid
//   - false -> the data has errors (so the caller can ask again)
function validateData(name, document, contactNumber, email) {
  // Find out the data type of each value ("string", "number", etc.) so we can
  // confirm they are text before running text-specific checks on them.
  const typeName = typeof name;
  const typeDocument = typeof document;
  const typeContactNumber = typeof contactNumber;
  const typeEmail = typeof email;

  // Empty list that will hold a message for every rule the data breaks.
  const errors = [];

  if (typeName !== "string") {
    errors.push("El nombre debe ser una cadena de texto");
  }

  if (name.split(" ").length < 2) {
    errors.push("El nombre debe tener al menos dos palabras");
  }

  if (typeDocument !== "string") {
    errors.push("El documento debe ser una cadena de texto");
  }

  if (typeContactNumber !== "string") {
    errors.push("El número de contacto debe ser un número");
  }

  if (contactNumber.length !== 10) {
    errors.push("El número de contacto debe tener 10 dígitos");
  }

  if (typeEmail !== "string") {
    errors.push("El email debe ser una cadena de texto");
  }

  if (!email.includes("@")) {
    errors.push("El email no es válido");
  }

  // If we collected at least one error, print all of them and report failure.
  if (errors.length > 0) {
    console.log(
      "==================== SE ENCONTRARON INCONGRUENCIAS EN LOS DATOS ====================",
    );
    for (const error of errors) {
      console.log(`* ${error}`);
    }
    console.log(
      "=====================================================================================",
    );
    return false;
  }

  // No errors were found: the data is valid.
  return true;
}

// addUser(): registers a new user. It keeps asking for the four fields in a
// loop until validateData accepts them, then saves the user into
// attendanceList. It is "async" because it uses "await input(...)".
async function addUser() {
  clearScreen();
  // Prepare the variables that will hold the user's answers.
  let name = "";
  let document = "";
  let contactNumber = "";
  let email = "";
  // Ask for the data over and over until it passes validation.
  while (true) {
    name = await input("Ingrese el nombre: ");
    document = await input("Ingrese el documento: ");
    contactNumber = await input("Ingrese el número de contacto: ");
    email = await input("Ingrese el email: ");

    clearScreen();
    // Validate what was typed. If it is valid, leave the loop with "break".
    const validationUser = validateData(name, document, contactNumber, email);
    if (validationUser) {
      break;
    }
  }
  // Save the validated user as a new object at the end of the list.
  AttendanceList.push({
    name,
    document,
    contactNumber,
    email,
  });

  fs.writeFileSync(attendanceListPath, JSON.stringify(AttendanceList));

  console.log(`Usuario ${name} - ${document} agregado correctamente`);
  await input("Presione enter para continuar");
}

const exampleUser = {
  name: "Juan Perez",
  document: "1234567890",
  contactNumber: "1234567890",
  email: "juanperez@gmail.com",
};

// printAttendanceList(): shows every registered user on screen. If the list is
// empty it says so; otherwise it prints one line per user. At the end it waits
// for Enter so the user can read the list before the menu clears the screen.
async function printAttendanceList() {
  clearScreen();
  console.log("================================================");
  console.log("Lista de asistencia");
  console.log("================================================");
  if (AttendanceList.length === 0) {
    console.log("No hay usuarios en la lista");
  } else {
    for (const user of AttendanceList) {
      console.log(
        `* ${user.name} - ${user.document} - ${user.contactNumber} - ${user.email}`,
      );
    }
  }
  console.log("================================================");
  await input("Presione enter para continuar");
}

// printSearchUserByDocument(): asks for a document number and looks for a user
// whose document matches it. ".find" returns the first matching user, or
// "undefined" if none is found. It then prints the result and waits for Enter.
async function printSearchUserByDocument() {
  clearScreen();
  const documentWrite = await input("Ingrese el documento del usuario: ");
  const user = AttendanceList.find(function (user) {
    return user.document === documentWrite.trim();
  });
  if (user) {
    console.log(
      `Usuario encontrado: ${user.name} - ${user.document} - ${user.contactNumber} - ${user.email}`,
    );
  } else {
    console.log("Usuario no encontrado");
  }
  await input("Presione enter para continuar");
}

async function deleteUser() {
  clearScreen();
  const documentWrite = await input("Ingrese el documento del usuario: ");
  const user = AttendanceList.find(function (user) {
    return user.document === documentWrite.trim();
  });
  if (user) {
    AttendanceList.splice(AttendanceList.indexOf(user), 1);
    console.log(
      `Usuario ${user.name} - ${user.document} eliminado correctamente`,
    );
  } else {
    console.log("Usuario no encontrado");
  }
  fs.writeFileSync(attendanceListPath, JSON.stringify(AttendanceList));
  await input("Presione enter para continuar");
}

// printMenu(...): draws the main menu options. If the previous choice was not
// valid (isInvalidOption is true), it first shows a warning with that option so
// the user knows what went wrong before choosing again.
function printMenu(isInvalidOption, option) {
  if (isInvalidOption) {
    console.log(`La opción '${option}' ingresada no es válida`);
  }
  console.log("================================================");
  console.log("1. Ingresar usuario");
  console.log("2. Ver lista de usuarios");
  console.log("3. Buscar usuario por nombre");
  console.log("4. Eliminar usuario");
  console.log("5. Salir");
  console.log("================================================");
}

const validOptions = ["1", "2", "3", "4", "5"];

async function main() {
  if(fs.readFileSync(attendanceListPath, "utf8") !== "") {
    AttendanceList.push(...JSON.parse(fs.readFileSync(attendanceListPath, "utf8")));
  }
  let option = null;
  let isInvalidOption = false;
  clearScreen();
  while (true) {
    printMenu(isInvalidOption, option);
    option = await input("Ingrese una opción: ");
    if (option === "1") {
      await addUser();
      isInvalidOption = false;
      clearScreen();
      continue;
    }
    if (option === "2") {
      await printAttendanceList();
      isInvalidOption = false;
      clearScreen();
      continue;
    }
    if (option === "3") {
      await printSearchUserByDocument();
      isInvalidOption = false;
      clearScreen();
      continue;
    }
    if (option === "4") {
      await deleteUser();
      isInvalidOption = false;
      clearScreen();
      continue;
    }
    if (option === "5") {
      process.exit(0);
    }
    if (!validOptions.includes(option)) {
      isInvalidOption = true;
      clearScreen();
    }
  }
}

main();
