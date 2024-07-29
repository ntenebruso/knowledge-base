import { createIcons, icons } from "lucide";

const openBtn = document.getElementById("menuOpenBtn");
const closeBtn = document.getElementById("menuCloseBtn");
const siteNav = document.getElementById("siteNav");

const openMenu = () => (siteNav.style.display = "flex");
const closeMenu = () => (siteNav.style.display = "none");

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

createIcons({ icons });
