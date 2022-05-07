// import header from './modules/header.js'
// import bannerSlider from './modules/banner-slider.js'
// import collections from './modules/collections.js'

// header.init()
// bannerSlider.init()
// collections.init()

import { getHomeContent } from './services/GetHomeContent.js'
import Home from './pages/home.js'

getHomeContent()
  .then(data => {
    Home(data)
  })
  .catch(error => {
    console.log(error)
  })
