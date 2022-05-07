const bannerSliderModule = () => {
  const sliderItens = document.querySelectorAll('[data-banner="item"]')
  const slider = document.querySelector('[data-banner="slider"]')
  const btnNext = document.querySelector('[data-banner="btn-next"]')
  const btnPrevious = document.querySelector('[data-banner="btn-previous"]')
  const btnControls = document.querySelectorAll('[data-banner="btn-control"]')
  const imgTitles = document.querySelectorAll('[data-banner="img-title"]')
  const state = {
    mouseDownPosition: 0,
    movementPosition: 0,
    // Para manter salva a última posição
    lastTranslatePosition: 0,
    currentSliderPosition: 0,
    currentSlideIndex: 0
  }

  function translateSlide(position) {
    state.lastTranslatePosition = position
    slider.style.transform = `translateX(${position}px)`
  }

  function getCenterPosition(index) {
    const slide = sliderItens[index]
    const margin = (document.body.clientWidth - slide.offsetWidth) / 2
    const centerPosition = margin - slide.offsetWidth * index
    return centerPosition
  }

  function fowardSlide() {
    if (state.currentSlideIndex < sliderItens.length - 1) {
      setVisibleSlide(state.currentSlideIndex + 1)
    } else {
      setVisibleSlide(state.currentSlideIndex)
    }
  }

  function backwardSlide() {
    if (state.currentSlideIndex > 0) {
      setVisibleSlide(state.currentSlideIndex - 1)
    } else {
      setVisibleSlide(state.currentSlideIndex)
    }
  }

  function animateTransition(active) {
    if (active) {
      slider.style.transition = 'transform .3s'
    } else {
      slider.style.removeProperty('transition')
    }
  }

  function activeControlButton(index) {
    btnControls.forEach(function (item) {
      item.classList.remove('active')
    })
    const btnControl = btnControls[index]
    btnControl.classList.add('active')
  }

  function activeImageTitle(index) {
    imgTitles.forEach(function (item) {
      item.classList.remove('active')
    })
    const imgTitle = imgTitles[index]
    imgTitle.classList.add('active')
  }

  const activeCurrentSlides = () => {
    // Função para alterar a opacidade das imagens que não aparecem diretamente na tela
    sliderItens.forEach((slide, slideIndex) => {
      slide.classList.remove('active')
      if (slideIndex === state.currentSlideIndex) {
        slide.classList.add('active')
      }
    })
  }

  function setArrowButtonsDisplay() {
    // Função usada para desaparecer com a seta quando for o primeiro ou último slide
    btnPrevious.style.display = state.currentSlideIndex === 0 ? 'none' : 'block'
    btnNext.style.display =
      state.currentSlideIndex === sliderItens.length - 1 ? 'none' : 'block'
  }

  function setVisibleSlide(index) {
    state.currentSlideIndex = index
    const position = getCenterPosition(index)
    activeCurrentSlides()
    setArrowButtonsDisplay()

    activeControlButton(index)
    activeImageTitle(index)

    animateTransition(true)

    translateSlide(position)
  }

  function preventDefault(event) {
    event.preventDefault()
  }

  function onControlButtonClick(event, index) {
    setVisibleSlide(index)
  }

  function onMouseDown(event, index) {
    const slide = event.currentTarget
    // Referente a posição X
    state.mouseDownPosition = event.clientX
    state.currentSliderPosition = event.clientX - state.lastTranslatePosition
    state.currentSlideIndex = index
    animateTransition(false)
    // Quando passar o mouse por cima do elemento, parecido com o hover
    slide.addEventListener('mousemove', onMouseMove)
  }

  function onMouseMove(event) {
    state.movementPosition = event.clientX - state.mouseDownPosition
    translateSlide(event.clientX - state.currentSliderPosition)
  }

  function onMouseUp(event) {
    const slide = event.currentTarget
    const movementQtd = event.type.includes('touch') ? 50 : 150
    if (state.movementPosition > movementQtd) {
      backwardSlide()
    } else if (state.movementPosition < -movementQtd) {
      fowardSlide()
    } else {
      setVisibleSlide(state.currentSlideIndex)
    }
    state.movementPosition = 0
    slide.removeEventListener('mousemove', onMouseMove)
  }

  function onMouseLeave(event) {
    const slide = event.currentTarget
    slide.removeEventListener('mousemove', onMouseMove)
  }

  function onTouchStart(event, index) {
    const slide = event.currentTarget
    slide.addEventListener('touchmove', onTouchMove)
    event.clientX = event.touches[0].clientX
    onMouseDown(event, index)
  }

  function onTouchMove(event) {
    event.clientX = event.touches[0].clientX
    onMouseMove(event)
  }

  function onTouchEnd(event) {
    const slide = event.currentTarget
    slide.removeEventListener('touchmove', onTouchMove)
    onMouseUp(event)
  }

  function onResizeWindow() {
    setVisibleSlide(state.currentSlideIndex)
  }

  function setListeners() {
    btnNext.addEventListener('click', fowardSlide)
    btnPrevious.addEventListener('click', backwardSlide)

    sliderItens.forEach(function (slide, index) {
      const link = slide.querySelector('.banner-slider__link')
      link.addEventListener('click', preventDefault)
      // para não permitir arrastar a imagem
      slide.addEventListener('dragstart', preventDefault)
      // mousedown é quando aperta o botão do mouse
      slide.addEventListener('mousedown', function (event) {
        onMouseDown(event, index)
      })
      // mouseup é quando solta o botão do mouse
      slide.addEventListener('mouseup', onMouseUp)
      // mouse leave é quando tira o mouse de cima de algum elemento
      slide.addEventListener('mouseleave', onMouseLeave)

      // Parte do btnControl

      btnControls[index].addEventListener('click', function (event) {
        onControlButtonClick(event, index)
      })

      slide.addEventListener('touchstart', function (event) {
        onTouchStart(event, index)
      })

      slide.addEventListener('touchend', onTouchEnd)
    })
    // relacionado a responsividade
    let resizeTimeout
    window.addEventListener('resize', function (event) {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(function () {
        onResizeWindow()
      }, 1000)
    })
  }

  function init() {
    // Coloquei o número 2 para a página já carregar no terceiro slide
    setVisibleSlide(2)
    setListeners()
  }

  return {
    init
  }
}

export default bannerSliderModule
