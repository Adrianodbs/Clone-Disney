const headerModule = () => {
  const header = document.querySelector('[data-header]')
  const openNavSubmenu = document.querySelector('[data-open-navsubmenu]')
  const NavSubmenu = document.querySelector('[data-navsubmenu]')
  const openUsermenu = document.querySelector('[data-open-usermenu]')
  const usermenu = document.querySelector('[data-usermenu]')

  function onWindowScroll() {
    if (window.scrollY > 20) {
      header.style.backgroundColor = '#0c0d14'
    } else {
      header.style.backgroundColor = 'transparent'
    }
  }

  function onTouchOpenNavSubmenu(event) {
    // Utilizado para prevenir o comportamento padrão
    event.preventDefault()
    // O toggle verifica se o elemento tem a classe(se não tiver ele coloca, se tiver ele remove)
    NavSubmenu.classList.toggle('active')
  }

  function onTouchOpenUsermenu(event) {
    event.preventDefault()
    usermenu.classList.toggle('active')
  }

  function setListeners() {
    // Window é um objeto que representa a janela do navegador
    window.addEventListener('scroll', onWindowScroll)
    openNavSubmenu.addEventListener('touchStart', onTouchOpenNavSubmenu)
    openUsermenu.addEventListener('touchStart', onTouchOpenUsermenu)
  }
  function init() {
    setListeners()
  }

  return {
    init
  }
}

export default headerModule
