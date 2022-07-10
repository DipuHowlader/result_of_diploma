const form = document.querySelector("#getResult");
const roll = document.querySelector("#roll");
const error = document.querySelector("#error");
const passed = document.querySelector("#passed");
const failed = document.querySelector("#failed");
const loading = document.querySelector("#loading");
const wrapper = document.querySelector("#wrapper");
const toast = document.querySelector("#toast");

let isLoading = false;

function excuteLoading(isLoading) {
  if (!isLoading) {
    loading.classList.add("hidden");
    wrapper.classList.remove("blur-sm");
  } else {
    passed.classList.add("hidden")
    failed.classList.add("hidden")
    loading.classList.remove("hidden");
    wrapper.classList.add("blur-sm");
  }
}

const API_ROOT = "http://127.0.0.1:8000/result";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const rollNumber = roll.value;
  if (rollNumber == "" || rollNumber.length !== 6 || isNaN(rollNumber)) {
    error.textContent = "Please provide a valid Roll Number";
    return false;
  } else {
    excuteLoading(true);
    error.textContent = "";
    fetch(API_ROOT + "/" + rollNumber)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          excuteLoading(false);
          if (result.data.result) {
            passed.classList.remove("hidden");
            document.querySelector(
              "#passed span"
            ).innerHTML = `<span class='block bg-slate-300 py-3 px-5 shadow mb-3 text-center bold text-xl text-slate-900'>${result.data.result}</span>`;
          } else if (result.sub !== []) {
            failed.classList.remove("hidden");
            let all = "";
            result.sub.forEach((element) => {
              all += `<span class='block bg-slate-300 py-3 px-5 shadow mb-2 text-slate-900'>${element}</span>`;
            });
            failed.querySelector("div").innerHTML = all;
          } else {
            failed.classList.remove("hidden");
          }
        }
      })
      .catch((error) => {
        excuteLoading(false);
        toast.classList.remove(`-top-80`);
      });
  }
});
