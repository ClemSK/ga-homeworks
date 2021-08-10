import { div } from 'prelude-ls'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Hero from './components/Hero'
import NavBar from './components/NavBar'
// import Hero from './components/Hero'
// import Gallery from './components/Gallery'
// import Menus from './components/Menus'
// import About from './components/About'
// import Footer from './components/Footer'

const App = () => {
  const state = {
    about: {
      text: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rhoncus magna id quam euismod, quis consectetur augue malesuada. Aenean et libero elementum, consequat eros in, vehicula risus. Phasellus imperdiet pretium massa, ut tincidunt neque mollis sed',
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce nibh lectus, maximus in condimentum sit amet, imperdiet vel metus. Vivamus rhoncus massa eu nisi ultrices consequat. Cras at porttitor quam. Pellentesque feugiat elit odio, vel mattis arcu ullamcorper eget. Vestibulum vitae viverra mauris, porta pharetra nulla. Donec ipsum mauris, malesuada ac facilisis viverra, faucibus id libero. Mauris nec ipsum sit amet elit luctus pulvinar interdum a urna.',
        'Etiam a nunc nec neque gravida tincidunt. Nulla et interdum libero. Pellentesque ultricies, ex ac blandit congue, elit dolor rhoncus sem, non eleifend nisl metus ac tellus. Suspendisse tincidunt fringilla aliquam. Morbi scelerisque orci nisl, maximus pulvinar augue auctor et.',
      ]
    },
    menus: {
      links: ['Breakfast', 'Brunch', 'All Day'],
      text: [
        'We start early, with a breakfast menu including juices, pastries, pancakes, all kinds of eggs and freshly-roasted coffee. At 11.30am, we switch to our all-day menu.',
        'On weekends we serve brunch until 4pm.'
      ]
    },
    footer: {
      text: '© General Assembly 2017'
    }
  }

  return (
    <div >
      <NavBar class='container'/>
      <Hero class='section' id='hero'>
        <div>
          <h1 class='title'>Coffee Assembly</h1>
        </div>
      </Hero>
    </div>
  )
}

export default App

// {/* <Route path="menus" component={() => <li>Menus</li>} />
// <Route path="gallery" component={() => <li>Gallery</li>} />
// <Route path="hero" component={() => <li>Home</li>} /> */}