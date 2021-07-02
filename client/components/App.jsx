import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import db from '../../server/data/data'

const App = () => {
  const memes = db
  const [direction, setDirection] = useState()

  const swiped = (direction, meme) => {
    setDirection(direction)
  }

  return (
    <>
      <div className='biggestBox'>
        <div className='titleContainer'>
          <h1>Good or Bad?</h1>
          <p>Do you like memes? Well, swipe through this and decide if its good or bad.</p>
        </div>
        <div className='cardContainer'>
          {memes.map((meme) =>
            <TinderCard className='swipe' key={meme.id} onSwipe={(direction) => swiped(direction, meme.id)} >
              <div style={{ backgroundImage: 'url(' + meme.url + ')' }} className='card'>TEST CARD</div>
            </TinderCard>
          )}
        </div>
        {direction ? <h2 className='infotext'>This meme is {direction}</h2> : <h2>Start swiping!</h2> }
      </div>

    </>
  )
}

export default App
