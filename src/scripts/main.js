document.addEventListener('DOMContentLoaded', () => {
  new Splide('#gallery-carousel').mount();
  new Splide('#testimonials-carousel').mount();

  initModalMenu();
});

class ScrollLock {
  /** @type {Set<string>} */
  #lockTokens = new Set();

  /**
   * @param {string} lockClassName Class to be applied to the element when scroll lock is active
   * @param {string | undefined} elementSelector Element to lock scroll
   */
  constructor(lockClassName, elementSelector) {
    this.lockClassName = lockClassName;
    this.elementSelector = elementSelector;
  }

  get isLocked() {
    return this.#lockTokens.size > 0;
  }

  get element() {
    if (!this.elementSelector) {
      return document.body;
    }

    return document.querySelector(this.elementSelector);
  }

  addToken(token) {
    this.#lockTokens.add(token);
    this.updateScrollLock();
  }

  removeToken(token) {
    this.#lockTokens.delete(token)
    this.updateScrollLock();
  }

  updateScrollLock() {
    if (this.isLocked) {
      this.lockElement();
    } else {
      this.unlockElement();
    }
  }

  lockElement() {
    if (!this.element) {
      return;
    }

    this.element.classList.add(this.lockClassName);
  }

  unlockElement() {
    if (!this.element) {
      return;
    }

    this.element.classList.remove(this.lockClassName);
  }
}

class ModalWindow {
  scrollLockService = new ScrollLock('u-scrollLock');

  /**
   * @param {string} id Modal ID
   * @param {string} selector Modal HTML element selector
   * @param {string} activeClassName Modal active state class name
   * @param {string} hiddenClassName Modal hidden state class name
   * @param {boolean} scrollLock Scroll lock flag
   */
  constructor(id, selector, activeClassName, hiddenClassName, scrollLock = true) {
    this.id = id;
    this.selector = selector;
    this.activeClassName = activeClassName;
    this.hiddenClassName = hiddenClassName;
    this.scrollLock = scrollLock;
  }

  /**
   * @returns {HTMLElement | undefined}
   */
  getModal() {
    return document.querySelector(this.selector);
  }

  openModal() {
    const modalEl = this.getModal();

    if (!modalEl) {
      return;
    }

    modalEl.classList.remove(this.hiddenClassName);
    modalEl.classList.add(this.activeClassName);

    this.scrollLockService.addToken(this.id);
  }

  closeModal() {
    const modalEl = this.getModal();

    if (!modalEl) {
      return;
    }

    modalEl.classList.add(this.hiddenClassName);
    modalEl.classList.remove(this.activeClassName);

    this.scrollLockService.removeToken(this.id);
  }
}

/**
 * 
 * @param {ModalWindow} modal 
 * @param {NodeListOf<HTMLElement>} openTriggers 
 * @param {NodeListOf<HTMLElement>} closeTriggers 
 */
function initModalControls(modal, openTriggers, closeTriggers) {
  openTriggers.forEach(el => {
    el.addEventListener('click', () => modal.openModal())
  });

  closeTriggers.forEach(el => {
    el.addEventListener('click', () => modal.closeModal())
  });
}

function initModalMenu() {
  const modalMenu = new ModalWindow('MOBILE_MENU', '#mobile-menu', 'ModalWindow--active', 'ModalWindow--hidden');

  const openTriggers = document.querySelectorAll('#mobile-menu-trigger');
  const closeTriggers = document.querySelectorAll('#mobile-menu-close, #mobile-menu .NavLinks-link');

  initModalControls(modalMenu, openTriggers, closeTriggers);
}
