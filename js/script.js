document.addEventListener('DOMContentLoaded', () => {
  const beforeImg = document.querySelector('.example__image--before');
  const afterImg = document.querySelector('.example__image--after');
  const range = document.querySelector('.example__range');
  const btnBefore = document.querySelector('.example__control--before');
  const btnAfter = document.querySelector('.example__control--after');
  const controls = document.querySelector('.example__controls');
  let siteMenu = document.querySelector(".site-menu"),
      headerToggler = document.querySelector(".page-header__toggler");

  if (siteMenu) siteMenu.classList.remove("site-menu--nojs");
  if (headerToggler) {
    headerToggler.onclick = function () {
      siteMenu.classList.toggle("site-menu--open");
      headerToggler.classList.toggle("page-header__toggler--open");
      headerToggler.classList.toggle("page-header__toggler--closed");
    };
  }

  if (range) {
    if (typeof range.min === 'undefined') range.min = 0;
    if (typeof range.max === 'undefined') range.max = 100;
    if (range.value === '') range.value = 50;
  }

  const updateImages = (value) => {
    const val = Number(value);
    if (isNaN(val)) return;
    beforeImg && (beforeImg.style.clipPath = `inset(0 ${val}% 0 0)`);
    afterImg && (afterImg.style.clipPath = `inset(0 0 0 ${100 - val}%)`);

    if (window.innerWidth < 768 && controls) {
      if (val > 50) {
        controls.classList.add('example__controls--after');
      } else {
        controls.classList.remove('example__controls--after');
      }
    }
  };

  updateImages(range ? range.value : 50);

  if (range) {
    range.addEventListener('input', (e) => {
      updateImages(e.target.value);
    });
  }

  if (btnBefore) {
    btnBefore.addEventListener('click', () => {
      updateImages(0);
      if (range) range.value = 0;
    });
  }

  if (btnAfter) {
    btnAfter.addEventListener('click', () => {
      updateImages(100);
      if (range) range.value = 100;
    });
  }
});
