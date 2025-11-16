// favorites
const svgDefault = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
    <path fill="#fff" d="M1.616 7.666c0-3.046 2.109-5.171 4.823-5.171 1.577 0 2.822.738 3.561 1.826.747-1.096 1.984-1.826 3.561-1.826 2.723 0 4.823 2.125 4.823 5.171 0 3.553-2.972 7.056-7.612 10.044-.25.158-.556.315-.772.315-.208 0-.523-.157-.772-.315-4.64-2.988-7.612-6.491-7.612-10.044Zm1.669 0c0 2.938 3.063 6.184 6.557 8.508.075.05.125.083.158.083s.083-.033.158-.083c3.494-2.324 6.557-5.57 6.557-8.508 0-2.108-1.386-3.528-3.245-3.528-1.494 0-2.308.922-2.864 1.71-.25.324-.39.44-.606.44-.216 0-.374-.108-.606-.44-.523-.797-1.361-1.71-2.864-1.71-1.86 0-3.245 1.42-3.245 3.528Z"/>
</svg>`;

const svgActive = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
    <path fill="#FF395C" d="M10 18.025c-.208 0-.523-.157-.772-.315-4.64-2.988-7.612-6.491-7.612-10.044 0-3.046 2.109-5.171 4.757-5.171 1.643 0 2.888.921 3.627 2.282.747-1.37 1.984-2.282 3.636-2.282 2.648 0 4.748 2.125 4.748 5.171 0 3.553-2.972 7.056-7.612 10.044-.25.158-.556.315-.772.315Z"/>
</svg>`;

document.querySelectorAll('.fav').forEach(btn => {
    btn.addEventListener('click', e => {
    const el = e.currentTarget;
    el.classList.toggle('is-fav');
    el.innerHTML = el.classList.contains('is-fav') ? svgActive : svgDefault;
    });
});


// panels + search mobile
(function(){
  const catalogBtn = document.getElementById('catalogBtn');
  const menuBtn = document.getElementById('menuBtn');
  const catalogPanel = document.getElementById('catalogPanel');
  const menuPanel = document.getElementById('menuPanel');
  const header = document.querySelector('.site-header');
  const blur = document.querySelector('.page-blur');
  const searchButton = document.querySelector('.search-finder');
  const searchPanel = document.querySelector('.search-nav-panel');

  if (!catalogBtn || !menuBtn || !catalogPanel || !menuPanel) return;

  let lastFocused = null;

  // SVG иконки
  const icons = {
    catalog: {
      default: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
          <path fill="#222" d="M4.032 9.368c-1.196 0-1.785-.59-1.785-1.818V4.08c0-1.228.59-1.81 1.785-1.81H7.56c1.195 0 1.784.582 1.784 1.81v3.47c0 1.228-.59 1.818-1.784 1.818H4.032Zm8.4 0c-1.204 0-1.784-.59-1.784-1.818V4.08c0-1.228.58-1.81 1.784-1.81h3.528c1.195 0 1.785.582 1.785 1.81v3.47c0 1.228-.59 1.818-1.785 1.818h-3.528ZM4.04 7.998h3.503c.29 0 .44-.141.44-.448V4.072c0-.29-.15-.44-.44-.44H4.04c-.29 0-.432.15-.432.44V7.55c0 .307.142.448.432.448Zm8.4 0h3.512c.29 0 .423-.141.423-.448V4.072c0-.29-.133-.44-.423-.44H12.44c-.29 0-.431.15-.431.44V7.55c0 .307.14.448.431.448ZM4.032 17.76c-1.196 0-1.785-.581-1.785-1.81v-3.47c0-1.236.59-1.817 1.785-1.817H7.56c1.195 0 1.784.58 1.784 1.817v3.47c0 1.229-.59 1.81-1.784 1.81H4.032Zm8.4 0c-1.204 0-1.784-.581-1.784-1.81v-3.47c0-1.236.58-1.817 1.784-1.817h3.528c1.195 0 1.785.58 1.785 1.817v3.47c0 1.229-.59 1.81-1.785 1.81h-3.528ZM4.04 16.398h3.503c.29 0 .44-.149.44-.44V12.48c0-.307-.15-.448-.44-.448H4.04c-.29 0-.432.141-.432.448v3.479c0 .29.142.44.432.44Zm8.4 0h3.512c.29 0 .423-.149.423-.44V12.48c0-.307-.133-.448-.423-.448H12.44c-.29 0-.431.141-.431.448v3.479c0 .29.14.44.431.44Z"/>
        </svg>
      `,
      activeDesktop: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
          <path fill="#fff" d="M16.416 15.128a.935.935 0 0 1-.008 1.304.937.937 0 0 1-1.311.008l-5.105-5.105-5.105 5.105c-.34.34-.947.349-1.312-.008a.935.935 0 0 1 0-1.304l5.105-5.113L3.575 4.91c-.348-.34-.348-.946 0-1.311.357-.357.971-.349 1.312 0l5.105 5.105 5.105-5.105a.937.937 0 0 1 1.311.008.927.927 0 0 1 .008 1.303l-5.104 5.105 5.104 5.113Z"/>
        </svg>
      `,
      activeMobile: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
          <path fill="#FF395C" d="M4.032 9.368c-1.196 0-1.785-.581-1.785-1.81V4.08c0-1.228.59-1.81 1.785-1.81H7.56c1.195 0 1.784.582 1.784 1.81v3.478c0 1.229-.59 1.81-1.784 1.81H4.032Zm8.4 0c-1.204 0-1.784-.581-1.784-1.81V4.08c0-1.228.58-1.81 1.784-1.81h3.528c1.195 0 1.785.582 1.785 1.81v3.478c0 1.229-.59 1.81-1.785 1.81h-3.528Zm-8.4 8.4c-1.196 0-1.785-.581-1.785-1.818v-3.47c0-1.228.59-1.81 1.785-1.81H7.56c1.195 0 1.784.582 1.784 1.81v3.47c0 1.237-.59 1.818-1.784 1.818H4.032Zm8.4 0c-1.204 0-1.784-.581-1.784-1.818v-3.47c0-1.228.58-1.81 1.784-1.81h3.528c1.195 0 1.785.582 1.785 1.81v3.47c0 1.237-.59 1.818-1.785 1.818h-3.528Z"/>
        </svg>
      `
    },
    menu: {
      default: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
          <path fill="#222" d="M2.239 7.035a.756.756 0 0 1-.747-.755c0-.415.332-.747.747-.747h15.514a.75.75 0 1 1 0 1.502H2.239Zm0 3.736a.75.75 0 0 1-.747-.748c0-.423.332-.763.747-.763h15.514a.76.76 0 0 1 .755.763c0 .407-.34.748-.755.748H2.239Zm0 3.743a.758.758 0 0 1-.747-.763.75.75 0 0 1 .747-.748h15.514a.75.75 0 0 1 .755.748.76.76 0 0 1-.755.763H2.239Z"/>
        </svg>
      `,
      activeDesktop: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
          <path fill="#fff" d="M16.416 15.128a.935.935 0 0 1-.008 1.304.937.937 0 0 1-1.311.008l-5.105-5.105-5.105 5.105c-.34.34-.947.349-1.312-.008a.935.935 0 0 1 0-1.304l5.105-5.113L3.575 4.91c-.348-.34-.348-.946 0-1.311.357-.357.971-.349 1.312 0l5.105 5.105 5.105-5.105a.937.937 0 0 1 1.311.008.927.927 0 0 1 .008 1.303l-5.104 5.105 5.104 5.113Z"/>
        </svg>
      `,
      activeMobile: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
          <path fill="#222" d="M16.416 15.128a.935.935 0 0 1-.008 1.304.937.937 0 0 1-1.311.008l-5.105-5.105-5.105 5.105c-.34.34-.947.349-1.312-.008a.935.935 0 0 1 0-1.304l5.105-5.113L3.575 4.91c-.348-.34-.348-.946 0-1.311.357-.357.971-.349 1.312 0l5.105 5.105 5.105-5.105a.937.937 0 0 1 1.311.008.927.927 0 0 1 .008 1.303l-5.104 5.105 5.104 5.113Z"/>
        </svg>
      `
    }
  };

  const isMobile = () => window.innerWidth < 768;

  function setOpen(btn, panel, open) {
    if (!btn || !panel) return;
    btn.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    btn.classList.toggle('active', open);

    const iconContainer = btn.querySelector('.icon');
    if (iconContainer) {
      if (btn.id === 'catalogBtn') {
        iconContainer.innerHTML = open
          ? (isMobile() ? icons.catalog.activeMobile : icons.catalog.activeDesktop)
          : icons.catalog.default;
      }
      if (btn.id === 'menuBtn') {
        iconContainer.innerHTML = open
          ? (isMobile() ? icons.menu.activeMobile : icons.menu.activeDesktop)
          : icons.menu.default;
      }
    }

    if (header && blur) {
      if (panel.id === 'catalogPanel') {
        header.classList.toggle('catalog-open', open);
        blur.classList.toggle('active', open);
      }
      if (panel.id === 'menuPanel') {
        header.classList.toggle('menu-open', open);
        blur.classList.toggle('active', open);
      }
    }

    if (open) {
      lastFocused = document.activeElement;
      const focusable = panel.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
      if (focusable) focusable.focus();
    } else {
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }
  }

  function closeAll() {
    setOpen(catalogBtn, catalogPanel, false);
    setOpen(menuBtn, menuPanel, false);
    closeSearch();
  }

  function initIcons() {
    const catalogIcon = catalogBtn.querySelector('.icon');
    const menuIcon = menuBtn.querySelector('.icon');
    if (catalogIcon) catalogIcon.innerHTML = icons.catalog.default;
    if (menuIcon) menuIcon.innerHTML = icons.menu.default;
  }

  // handlers
  catalogBtn.addEventListener('click', () => {
    const willOpen = catalogBtn.getAttribute('aria-expanded') !== 'true';
    if (willOpen) setOpen(menuBtn, menuPanel, false);
    closeSearch();
    setOpen(catalogBtn, catalogPanel, willOpen);
  });

  menuBtn.addEventListener('click', () => {
    const willOpen = menuBtn.getAttribute('aria-expanded') !== 'true';
    if (willOpen) setOpen(catalogBtn, catalogPanel, false);
    closeSearch();
    setOpen(menuBtn, menuPanel, willOpen);
  });

  // клик вне панелей
  document.addEventListener('click', e => {
    if (e.target.closest('.search-nav')) return;

    if (catalogPanel.classList.contains('open') && !catalogPanel.contains(e.target) && e.target !== catalogBtn)
      setOpen(catalogBtn, catalogPanel, false);
    if (menuPanel.classList.contains('open') && !menuPanel.contains(e.target) && e.target !== menuBtn)
      setOpen(menuBtn, menuPanel, false);
    if (searchPanel && searchPanel.classList.contains('open') && !searchPanel.contains(e.target) && e.target !== searchButton) {
      closeSearch();
    }
  });

  [catalogPanel, menuPanel, searchPanel].forEach(p => p && p.addEventListener('click', e => e.stopPropagation()));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });

  window.addEventListener('resize', () => {
    if (catalogBtn.classList.contains('active')) setOpen(catalogBtn, catalogPanel, true);
    if (menuBtn.classList.contains('active')) setOpen(menuBtn, menuPanel, true);
    if (window.innerWidth >= 768) closeAll();
  });

  // 🔍 SEARCH panel
  function closeSearch() {
    if (!searchPanel || !searchButton) return;
    searchPanel.classList.remove('open');
    searchButton.classList.remove('open');
    blur.classList.remove('active');
  }

  if (searchButton && searchPanel) {
    searchButton.addEventListener('click', function () {
      if (window.innerWidth < 768) {
        const open = !searchPanel.classList.contains('open');
        closeAll();
        searchPanel.classList.toggle('open', open);
        searchButton.classList.toggle('open', open);
        blur.classList.toggle('active', open);
      }
    });
  }

  initIcons();
})();







// search input clear button
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const searchNav = document.querySelector(".search-nav");

searchInput.addEventListener("input", () => {
  const hasValue = searchInput.value.trim().length > 0;
  clearBtn.style.display = hasValue ? "block" : "none";
  searchNav.classList.toggle("active", hasValue);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearBtn.style.display = "none";
  searchNav.classList.remove("active");
  searchInput.focus();
});



const catInfoOpenBtn = document.getElementById('showMoreBtn');
const catInfoText = document.getElementById('textBlock');

if (catInfoOpenBtn && catInfoText) {
  catInfoOpenBtn.addEventListener('click', () => {
    const isOpen = catInfoText.classList.contains('open');
    catInfoText.classList.toggle('open');

    // Меняем текст кнопки
    catInfoOpenBtn.textContent = isOpen ? 'Показать ещё' : 'Скрыть';

    if (isOpen) {
      const offsetTop = catInfoText.offsetTop - 40;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
}





document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.custom-select-wrapper');
  const header = wrapper.querySelector('.custom-select-header');
  const list = wrapper.querySelector('.custom-select-list');
  const valueBox = wrapper.querySelector('.custom-value-right-box');
  const realSelect = wrapper.querySelector('#realSelect');

  // Клик по шапке — открывает/закрывает список
  header.addEventListener('click', (e) => {
    e.stopPropagation(); // чтобы не закрылось сразу
    wrapper.classList.toggle('open');
  });

  // Клик по пункту
  list.querySelectorAll('li').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const value = item.dataset.value;
      const text = item.textContent;

      // Обновляем отображение
      valueBox.textContent = text;

      // Обновляем скрытый select
      realSelect.value = value;

      // Активный пункт
      list.querySelectorAll('li').forEach(li => li.classList.remove('active'));
      item.classList.add('active');

      // Закрыть список
      wrapper.classList.remove('open');
    });
  });

  // Клик вне селекта — закрывает
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove('open');
    }
  });
});




document.querySelectorAll('.swx-acc-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const content = item.querySelector('.swx-acc-content');

    if (item.classList.contains('active')) {
      // закрытие
      content.style.maxHeight = content.scrollHeight + 'px';
      requestAnimationFrame(() => {
        content.style.maxHeight = '0';
      });
      item.classList.remove('active');
    } else {
      // открытие
      content.style.maxHeight = content.scrollHeight + 'px';
      item.classList.add('active');
      content.addEventListener('transitionend', function handler() {
        content.style.maxHeight = 'none';
        content.removeEventListener('transitionend', handler);
      });
    }
  });
});


document.querySelectorAll('.card-swiper').forEach(function(cardSwiper) {
    new Swiper(cardSwiper, {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
        el: cardSwiper.querySelector('.swiper-pagination'),
        clickable: true,
    },
    navigation: {
        nextEl: cardSwiper.querySelector('.swiper-button-next'),
        prevEl: cardSwiper.querySelector('.swiper-button-prev'),
    },
    });
});


const promoSwiper = new Swiper('.promo-swiper', {
  slidesPerView: 2,
  spaceBetween: 24,
  slidesPerGroup: 2,
  loop: true,
  navigation: {
    nextEl: '.promo-unique-slider-btn-next',
    prevEl: '.promo-unique-slider-btn-prev',
  },
  pagination: {
    el: '.promo-unique-pagination',
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    }
  },
});


const faqItems = document.querySelectorAll(".service-page-faq__item");

faqItems.forEach(item => {
  const header = item.querySelector(".service-page-faq__header");

  header.addEventListener("click", () => {
    const openItem = document.querySelector(".service-page-faq__item.active");

    if (openItem && openItem !== item) {
      openItem.classList.remove("active");
      openItem.querySelector(".service-page-faq__body").style.maxHeight = 0;
    }

    item.classList.toggle("active");
    const body = item.querySelector(".service-page-faq__body");

    if (item.classList.contains("active")) {
      body.style.maxHeight = body.scrollHeight + "px";
    } else {
      body.style.maxHeight = 0;
    }
  });
});


const moreBtn = document.getElementById('roofDateMoreBtn');
const moreText = document.getElementById('roofDateMoreText');

if (moreBtn && moreText) {
  moreBtn.addEventListener('click', () => {
    const isOpen = moreText.style.maxHeight && moreText.style.maxHeight !== '0px';
    if (isOpen) {
      moreText.style.maxHeight = '0';
      moreBtn.classList.remove('open');
      moreBtn.textContent = 'Подробнее';
    } else {
      moreText.style.maxHeight = moreText.scrollHeight + 'px';
      moreBtn.classList.add('open');
      moreBtn.textContent = 'Скрыть';
    }
  });
}


document.querySelectorAll('.rbox-accordion-title').forEach(title => {
  const content = title.parentElement.querySelector('.accordion-content');
  if (title.classList.contains('open')) {
    content.style.maxHeight = 'none';
  }
  title.addEventListener('click', () => {
    const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
    if (isOpen) {
      content.style.maxHeight = content.scrollHeight + 'px';
      void content.offsetWidth;
      content.style.maxHeight = '0';
      title.classList.remove('open');
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      title.classList.add('open');
      content.addEventListener('transitionend', function handler(e) {
        if (title.classList.contains('open')) {
          content.style.maxHeight = 'none';
        }
        content.removeEventListener('transitionend', handler);
      });
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
    const bar = document.querySelector('.service-page-bar');
    const opener = document.querySelector('.service-page-bar-opener');
    const rightContent = document.querySelector('.service-page-right-content');
    const closer = document.querySelector('.service-page-right-content-closer');
    const blur = document.querySelector('.page-blur');

    // --- ЛОГИКА ШИРИНЫ ДЛЯ BAR ---
    if (bar) {
        function checkWidth() {
            if (window.innerWidth < 992) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
                if (rightContent) rightContent.classList.remove('active');
                if (blur) blur.classList.remove('active');
            }
        }
        checkWidth();
        window.addEventListener('resize', checkWidth);
    }

    // --- ОТКРЫТИЕ ---
    if (opener && rightContent && bar && blur) {
        opener.addEventListener('click', () => {
            rightContent.classList.add('active');
            bar.classList.remove('active');
            blur.classList.add('active');
        });
    }

    // --- ЗАКРЫТИЕ ---
    if (closer && rightContent && bar && blur) {
        closer.addEventListener('click', () => {
            rightContent.classList.remove('active');
            bar.classList.add('active');
            blur.classList.remove('active');
        });
    }

    // --- КЛИК ПО ОБЩЕМУ BLUR ---
    if (blur && rightContent && bar) {
        blur.addEventListener('click', () => {
            // НЕ ТРОГАЕМ service-page если он не открыт
            if (!rightContent.classList.contains('active')) return;

            rightContent.classList.remove('active');
            bar.classList.add('active');
            blur.classList.remove('active');
        });
    }
});




let swxSwiper = null;

function initSwxSlider() {
  const wrapper = document.querySelector('.swx-package-list');
  if (!wrapper) return;

  const slides = [...wrapper.children];
  if (!slides.length) return;

  if (window.innerWidth < 768 && !swxSwiper) {
    slides.forEach(slide => {
      // гарантируем порядок: swiper-slide swx-package
      slide.className = `swiper-slide swx-package`;
    });

    swxSwiper = new Swiper('.swx-package-slider', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: 1,
      navigation: {
        nextEl: '.swx-unique-slider-btn-next',
        prevEl: '.swx-unique-slider-btn-prev',
      },
      pagination: {
        el: '.swx-unique-pagination',
        clickable: true,
      },
    });
  }

  if (window.innerWidth >= 768 && swxSwiper) {
    swxSwiper.destroy(true, true);
    swxSwiper = null;

    slides.forEach(slide => {
      // удаляем swiper-slide, оставляем только swx-package
      slide.className = `swx-package`;
    });
  }
}

initSwxSlider();
window.addEventListener('resize', initSwxSlider);



document.addEventListener('DOMContentLoaded', () => {
    const blur = document.querySelector('.modal-page-blur');
    const modals = document.querySelectorAll('.service-page-modal');

    // Если нет блюра или модалок — даже не запускаем обработчики
    // (не будет ошибок на других страницах)
    const hasAnyModal = modals.length > 0;
    const hasBlur = !!blur;

    // Открытие модалки
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-modal-target]');
        if (!btn) return;

        if (!hasAnyModal || !hasBlur) return;

        const target = btn.getAttribute('data-modal-target');
        const modal = document.querySelector(`.${target}`);
        if (!modal) return;

        closeAllModals();

        modal.classList.add('active');
        blur.classList.add('active');
    });

    // Закрытие по блюру
    if (hasBlur) {
        blur.addEventListener('click', () => {
            if (!hasAnyModal) return;
            closeAllModals();
        });
    }

    // Закрытие по кнопке .service-page-modal-close
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.service-page-modal-close')) return;
        if (!hasAnyModal || !hasBlur) return;
        closeAllModals();
    });

    function closeAllModals() {
        modals.forEach(modal => modal.classList.remove('active'));
        if (hasBlur) blur.classList.remove('active');
    }
});



const qtyButtons = document.querySelectorAll('#qty .service-page-modal-swxadd-btn');
const sizeButtons = document.querySelectorAll('#size .service-page-modal-swxadd-btn');
const finalPriceEl = document.getElementById('finalPrice');

let basePrice = 26900;  // базовая цена за выбранное количество
let sizeExtra = 0;      // добавка за размер

function updatePrice() {
    const final = basePrice + sizeExtra;
    finalPriceEl.textContent = final.toLocaleString('ru-RU') + ' ₽';
}

qtyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        qtyButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        basePrice = parseInt(btn.dataset.price);
        updatePrice();
    });
});

sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        sizeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        sizeExtra = parseInt(btn.dataset.extra);
        updatePrice();
    });
});

// Начальное обновление
updatePrice();



document.querySelectorAll('.service-page-modal-pack-screen').forEach(screen => {
  const switchContainer = screen.querySelector('.switch-container');
  if (!switchContainer) return;

  const buttons = switchContainer.querySelectorAll('.service-page-modal-pack-inner-btn');
  const contents = screen.querySelectorAll('.service-m-content-block');

  // Найти активный контент
  let activeContent = screen.querySelector('.service-m-content-block.active');

  if (!activeContent) {
    // Если нет активного, выбираем первый
    activeContent = contents[0];
    activeContent.classList.add('active');
  }

  // Ставим активную кнопку, соответствующую активному контенту
  buttons.forEach(b => b.classList.remove('active'));
  const activeIndex = [...contents].indexOf(activeContent);
  if (buttons[activeIndex]) {
    buttons[activeIndex].classList.add('active');
  }

  // Устанавливаем начальный класс switch-container
  if (activeIndex === 0) {
    switchContainer.classList.add('active-left');
    switchContainer.classList.remove('active-right');
  } else {
    switchContainer.classList.add('active-right');
    switchContainer.classList.remove('active-left');
  }

  // Обработчик кнопок
  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      // Снимаем активность со всех кнопок
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Переключаем контент
      const tab = btn.dataset.tab;
      contents.forEach(c => c.classList.toggle('active', c.id === tab));

      // Меняем класс switch-container
      if (idx === 0) {
        switchContainer.classList.add('active-left');
        switchContainer.classList.remove('active-right');
      } else {
        switchContainer.classList.add('active-right');
        switchContainer.classList.remove('active-left');
      }
    });
  });
});




const changers = document.querySelectorAll('.service-page-modal-pack-changer');
const screens = document.querySelectorAll('.service-page-modal-pack-screen');

changers.forEach((changer, index) => {
  changer.addEventListener('click', () => {

    // Активируем changer
    changers.forEach(c => c.classList.remove('active'));
    changer.classList.add('active');

    // Скрываем экраны
    screens.forEach(screen => screen.classList.remove('active'));

    // Показываем активный экран
    const activeScreen = screens[index];
    activeScreen.classList.add('active');

    // Сбрасываем ВСЕ switch-container внутри активного экрана
    activeScreen.querySelectorAll('.switch-container').forEach(sc => {
      sc.classList.remove('active-left', 'active-right');
    });

    // Сбрасываем кнопки в каждом switch-container внутри активного screen
    activeScreen.querySelectorAll('.service-tabs').forEach(tabs => {
      const btns = tabs.querySelectorAll('.service-page-modal-pack-inner-btn');
      const contents = tabs.querySelectorAll('.service-m-content-block');

      btns.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
    });

  });
});




// ELEMENTS
const galleryScreen = document.querySelector('.service-page-gallery-screen');

const gridScreen = document.querySelector('.service-page-gallery-screen-content');
const singleScreen = document.querySelector('.service-page-gallery-screen-single-page');

const gridBtn = document.querySelector('.service-page-gallery-screen-grid-btn');
const closeBtn = document.querySelector('.service-page-gallery-screen-close');
const openerBtn = document.querySelector('.service-page-gallery-item-opener');

const headerCount = document.querySelector('.service-page-gallery-screen-header-count');

const thumbs = document.querySelectorAll('.gallery-grid-item'); // миниатюры внутри галереи
const externalThumbs = document.querySelectorAll('.external-gallery-open'); // внешние фото

let swiper;


// =======================
// HEADER UPDATE FUNCTIONS
// =======================

const totalImages = thumbs.length;

// GRID MODE header
function showGridHeader() {
  headerCount.innerHTML = `${totalImages} фото / видео`;
}

// SLIDER header
function showSliderHeader(currentIndex) {
  headerCount.innerHTML = `
    <span id="current">${currentIndex}</span> /
    <span id="total">${totalImages}</span>
  `;
}


// =======================
// MODE SWITCHING
// =======================

function setGridMode() {
  galleryScreen.classList.remove('single-mode');
  galleryScreen.classList.add('grid-mode');

  gridBtn.classList.remove('grid-btn-active'); // скрываем кнопку
  showGridHeader();
}

function setSingleMode() {
  galleryScreen.classList.remove('grid-mode');
  galleryScreen.classList.add('single-mode');

  gridBtn.classList.add('grid-btn-active'); // показываем кнопку
}



// =======================
// OPEN GALLERY (GRID)
// =======================

function openGallery() {
  galleryScreen.classList.add('active');

  setGridMode();

  gridScreen.classList.add('active');
  singleScreen.classList.remove('active');
}


// =======================
// OPEN SLIDE (SWIPER)
// =======================

function openSlide(index) {

  galleryScreen.classList.add('active');

  gridScreen.classList.remove('active');
  singleScreen.classList.add('active');

  setSingleMode();
  showSliderHeader(index + 1);

  if (!swiper) {
    swiper = new Swiper('.service-page-gallery-big-swiper', {
      initialSlide: index,
      loop: 1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange: (sw) => {
          showSliderHeader(sw.realIndex + 1);
        }
      }
    });
  } else {
    swiper.slideTo(index, 0);
    showSliderHeader(index + 1);
  }
}


// =======================
// EVENTS
// =======================

// 1. Открытие по кнопке
openerBtn?.addEventListener('click', () => {
  openGallery();
});


// 2. Открытие по клику на миниатюру внутри грида
thumbs.forEach(img => {
  img.addEventListener('click', () => {
    const index = +img.dataset.index;
    openSlide(index);
  });
});


// 3. Открытие по внешним фотографиям
externalThumbs.forEach(img => {
  img.addEventListener('click', () => {
    const index = +img.dataset.index;
    openSlide(index);
  });
});


// 4. Кнопка GRID — возврат в сетку
gridBtn.addEventListener('click', () => {
  setGridMode();

  singleScreen.classList.remove('active');
  gridScreen.classList.add('active');
});


// 5. Кнопка CLOSE — закрыть весь экран
closeBtn.addEventListener("click", () => {
  // Закрываем весь экран
  galleryScreen.classList.remove("active");

  // Сбрасываем SINGLE PAGE
  singleScreen.classList.remove("active");

  // Возвращаем GRID PAGE
  gridScreen.classList.remove('active');

  // Возвращаем режим по умолчанию
  galleryScreen.classList.remove("single-mode");
  galleryScreen.classList.add("grid-mode");

  // Обновляем хедер под грид
  showGridHeader();
});





// =====================
// СОБИРАЕМ ВСЕ АЙТЕМЫ
// =====================
const items = [...document.querySelectorAll(".inc-swx-mod-item")];

// Индекс текущего айтема
let currentIndex = 0;


// =====================
// ЭЛЕМЕНТЫ МОДАЛКИ
// =====================
const imgWrapper = document.querySelector('.swx-inc-modal-img');
const titleEl = document.querySelector('.service-page-modal-swx-title');
const descEl = document.querySelector('.service-page-modal-swx-desc');
const contentWrapper = document.querySelector('.service-page-modal-content');


// =====================
// ОТРИСОВКА КОНТЕНТА
// =====================
function renderSlide(index, fade = false) {
  const item = items[index];

  if (!item) return;

  const img = item.dataset.img;
  const title = item.dataset.title;
  const desc = item.dataset.desc;

  if (fade) {
    contentWrapper.classList.add("fade-out");
    imgWrapper.classList.add("fade-out");
  }

  setTimeout(() => {
    imgWrapper.style.backgroundImage = `url(${img})`;
    titleEl.textContent = title;
    descEl.textContent = desc;

    contentWrapper.classList.remove("fade-out");
    imgWrapper.classList.remove("fade-out");
  }, fade ? 300 : 0);
}



// =====================
// КЛИК ПО .included-item
// =====================
items.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;          // ← Запоминаем какой item открыт
    renderSlide(currentIndex);     // ← Загружаем его в модалку
    // Открытие модалки у тебя в другом месте — не трогаю
  });
});



// =====================
// КНОПКИ ВЛЕВО / ВПРАВО
// =====================
document
  .querySelector(".service-page-modal-swx-nav-left .service-page-modal-swx-nav-btn")
  .addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    renderSlide(currentIndex, true);
  });

document
  .querySelector(".service-page-modal-swx-nav-right .service-page-modal-swx-nav-btn")
  .addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    renderSlide(currentIndex, true);
  });


