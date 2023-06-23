const input = document.getElementById("inputText");
const output = document.getElementById("output");
const outputResult = document.getElementById("result");
const outputText = document.getElementById("resultText");
const noneInfo = document.getElementById("noneinfo");
const copyTextBtn = document.getElementById("outputResultCopy");
const pasteBtn = document.getElementsByClassName("outputResultPaste")[0];

function isValidInput(str) {
  return /^[a-zñ.,!?¡¿\s]+$/.test(str);
}

function handleInvalidInput() {
  outputResult.style.display = "none";
  output.classList.add("none");
  noneInfo.style.display = "block";
  alert(
    "¡Ups! Parece que hay un problema con el texto ingresado.\n\nPor favor, asegúrate de ingresar solo letras minúsculas sin acentos."
  );
}

function handleEmptyInput() {
  alert(
    "¡Oops! Parece que no has ingresado ningún texto. \n\nPor favor, escribe algo en el campo de texto antes de continuar."
  );
}

function encrypt() {
  const keys = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };

  if (isValidInput(input.value)) {
    const encryptedText = input.value.replace(/[aeiou]/g, function (match) {
      return keys[match];
    });
    noneInfo.style.display = "none";
    output.classList.remove("none");
    outputResult.style.display = "flex";
    outputText.textContent = encryptedText;
  } else if (input.value === "") {
    handleEmptyInput();
  } else {
    handleInvalidInput();
  }
}

function decrypt() {
  const keys = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u",
  };

  if (isValidInput(input.value)) {
    const decryptedText = input.value.replace(
      /ai|enter|imes|ober|ufat/g,
      function (match) {
        return keys[match];
      }
    );
    noneInfo.style.display = "none";
    output.classList.remove("none");
    outputResult.style.display = "flex";
    outputText.textContent = decryptedText;
  } else if (input.value === "") {
    handleEmptyInput();
  } else {
    handleInvalidInput();
  }
}

function copyToClipboard() {
  if (navigator.clipboard) {
    try {
      const copyText = outputText.innerText;
      navigator.clipboard.writeText(copyText);
      pasteBtn.style.display = "block";
    } catch (error) {
      console.error("Error al copiar texto: ", error);
    }
  } else {
    console.warn(
      "Tu navegador no es compatible con la función de copiar al portapapeles."
    );
  }
}

async function pasteFromClipboard() {
  if (navigator.clipboard) {
    try {
      const pasteText = await navigator.clipboard.readText();
      input.value = pasteText;
    } catch (error) {
      console.error("Error al pegar texto: ", error);
    }
  } else {
    console.warn(
      "Tu navegador no es compatible con la función de pegar desde el portapapeles."
    );
  }
}
