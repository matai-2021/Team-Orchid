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
          <img src={memes[0].url} alt='title' className='title'/>
          <p className='description'>Swipe left if cringe, swipe right if based</p>
        </div>
        <div className='cardContainer'>
          {memes.map((meme) =>
            <TinderCard className='swipe' key={meme.id} onSwipe={(direction) => swiped(direction, meme.id)} >
              <img src={meme.url} alt='memes' className='card'/>
            </TinderCard>
          )}
        </div>
        {direction ? <h2 className='infotext'>This meme is {direction}</h2> : <h2>Start swiping!</h2> }
      </div>

    </>
  )
}

export default App
