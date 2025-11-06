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

    // panels
(function(){
    const catalogBtn = document.getElementById('catalogBtn');
    const menuBtn = document.getElementById('menuBtn');
    const catalogPanel = document.getElementById('catalogPanel');
    const menuPanel = document.getElementById('menuPanel');
    const header = document.querySelector('.site-header');
    const blur = document.querySelector('.page-blur');

    if (!catalogBtn || !menuBtn || !catalogPanel || !menuPanel) return;

    let lastFocused = null;

    // картинки для смены
    const icons = {
      catalog: {
        default: 'assets/img/catalog-icon.svg',
        active: 'assets/img/catalog-icon-active.svg'
      },
      menu: {
        default: 'assets/img/burger.svg',
        active: 'assets/img/close.svg'
      }
    };

    function setOpen(btn, panel, open) {
      if (!btn || !panel) return;

      // Атрибуты ARIA
      btn.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('open', open);
      panel.setAttribute('aria-hidden', String(!open));

      // 🔥 Активное состояние кнопок
      btn.classList.toggle('active', open);

      // Смена иконки
      const img = btn.querySelector('img');
      if (img) {
        if (btn.id === 'menuBtn') {
          img.src = open ? icons.menu.active : icons.menu.default;
        } else if (btn.id === 'catalogBtn') {
          img.src = open ? icons.catalog.active : icons.catalog.default;
        }
      }

      // 🌫️ blur и классы на header
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

      // Фокус-менеджмент
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
    }

    catalogBtn.addEventListener('click', () => {
      const willOpen = catalogBtn.getAttribute('aria-expanded') !== 'true';
      if (willOpen) setOpen(menuBtn, menuPanel, false);
      setOpen(catalogBtn, catalogPanel, willOpen);
    });

    menuBtn.addEventListener('click', () => {
      const willOpen = menuBtn.getAttribute('aria-expanded') !== 'true';
      if (willOpen) setOpen(catalogBtn, catalogPanel, false);
      setOpen(menuBtn, menuPanel, willOpen);
    });

    // Клик вне панели (не закрываем при фокусе или клике по поиску)
    document.addEventListener('click', e => {
    const isSearch = e.target.closest('.search-nav'); // 🔍 проверяем, кликнули ли по поиску

    if (isSearch) return; // если это поле поиска — ничего не закрываем

    if (catalogPanel.classList.contains('open') && !catalogPanel.contains(e.target) && e.target !== catalogBtn) {
        setOpen(catalogBtn, catalogPanel, false);
    }
    if (menuPanel.classList.contains('open') && !menuPanel.contains(e.target) && e.target !== menuBtn) {
        setOpen(menuBtn, menuPanel, false);
    }
    });


    // Не закрывать при клике внутри
    [catalogPanel, menuPanel].forEach(p => {
      p.addEventListener('click', e => e.stopPropagation());
    });

    // ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeAll();
      }
    });
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
