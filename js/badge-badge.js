"use scrict";

const badges = document.querySelectorAll(".badge-badge__badge");

for (let i = 0; i < badges.length; i++) {
  // changeBadge
  const badge = {
    type: badges[i].id,
    color: "gold",
    inscr: "as-seen-on",
  };

  const badgeImage = badges[i].querySelector(".badge-badge__badge-image");
  const colorBtns = badges[i].querySelectorAll(".badge-badge__badge-color");
  const inscrBtns = badges[i].querySelectorAll(
    ".badge-badge__badge-inscription"
  );

  function changeBadge(btns, btnsType) {
    for (let n = 0; n < btns.length; n++) {
      btns[n].addEventListener("click", function (e) {
        if (btnsType === "inscr") {
          for (let j = 0; j < btns.length; j++) {
            btns[j].classList.remove("underline");
          }
          btns[n].classList.add("underline");
        }
        badge[btnsType] = e.currentTarget.id;
        badgeImage.style.opacity = "0";
        setTimeout(() => {
          badgeImage.setAttribute(
            "src",
            `./images/badges/${badge.type}--${badge.color}--${badge.inscr}.png`
          );
          badgeImage.style.opacity = "1";
        }, 200);
      });
    }
  }

  changeBadge(inscrBtns, "inscr");
  changeBadge(colorBtns, "color");

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
