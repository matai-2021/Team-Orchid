import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
  {
    id: 'Richard Hendricks',
    url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.infometrics.co.nz%2Fchart-of-the-month-going-to-the-dogs%2F&psig=AOvVaw0BdxsIQ175eXmzbLf3A31a&ust=1625266261674000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPDm0uP6wvECFQAAAAAdAAAAABAD'
  }
]

const App = () => {
  const memes = db
  const [direction, setDirection] = useState()

  const swiped = (direction, meme) => {
    setDirection(direction)
  }

  return (
    <>
      <div>
        <h1>Good or Bad?</h1>
        <p>Do you like memes? Well, swipe through this and decide if its good or bad.</p>
        <div className='cardContainer'>
          {memes.map((meme) =>
            <TinderCard className='swipe' key={meme.id} onSwipe={(direction) => swiped(direction, meme.id)} >
              <div style={{ backgroundImage: 'url(' + meme.url + ')' }} className='card'>This is a test</div>
            </TinderCard>
          )}
        </div>
        {direction ? <h2 className='infotext'>This meme is {direction}</h2> : <h2>Start swiping!</h2> }
      </div>

    </>
  )
}

export default App
