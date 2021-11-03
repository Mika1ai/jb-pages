"use scrict";

const badges = document.querySelectorAll(".badge-badge__badge");

for (let i = 0; i < badges.length; i++) {
  // inscription
  const inscrBtn = badges[i].querySelectorAll(
    ".badge-badge__badge-inscription"
  );
  const inscrField = badges[i].querySelector(".badge-badge__inscription");

  for (let j = 0; j < inscrBtn.length; j++) {
    inscrBtn[j].addEventListener("click", () => {
      inscrField.textContent = inscrBtn[j].querySelector("span").textContent;
    });
  }

  // colors
  const colorsBtn = badges[i].querySelectorAll(".badge-badge__badge-color");
  const badge = badges[i].querySelector("#badge");

  for (let n = 0; n < colorsBtn.length; n++) {
    colorsBtn[n].addEventListener("click", () => {
      badge.removeAttribute("class");
      badge.classList.add(`${colorsBtn[n].id}`);
    });
  }

  // copy
  const copyBtn = badges[i].querySelector(".badge-badge__badge-copy");

  copyBtn.addEventListener("click", function (e) {
    e.preventDefault();
    navigator.clipboard.writeText(copyBtn.href);
    copyBtn.classList.add("copied");
    setTimeout(() => {
      copyBtn.classList.remove("copied");
    }, 700);
  });
}
