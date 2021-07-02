import React, { useState, useMemo } from 'react'
import TinderCard from 'react-tinder-card'

import db from '../../server/data/data'

const alreadyRemoved = []
let memeState = db

const App = () => {
  // const memes = db
  const [direction, setDirection] = useState()
  const [choice, setChoice] = useState()
  const [memes, setMemes] = useState(db)


  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  console.log(childRefs)


  const swiped = (direction, meme) => {
    setDirection(direction)
    alreadyRemoved.push(meme)
    switch (direction) {
      case 'right':
        setChoice('based')
        break
      case 'left':
        setChoice('cringe')
        break
      case 'up':
        setChoice('SUPER BASED')
        break
      case 'down':
        setChoice('illegal')
    }
  }

  const outOfFrame = (id) => {
    console.log(id + ' left the screen!')
    memeState = memeState.filter(meme => meme.id !== id)
    setMemes(memeState)
  }

  const swipe = (direction) => {
    const memesLeft = memes.filter(meme => !alreadyRemoved.includes(meme.id))
    if (memesLeft.length) {
      const toBeRemoved = memesLeft[memesLeft.length - 1].id // Find the card object to be removed
      const index = db.map(meme => meme.id).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(direction) // Swipe the card!
    }
  }

  return (
    <>
      <div>
        <h1>Good or Bad?</h1>
        <p>Do you like memes? Well, swipe through this and decide if its good or bad.</p>
        <div className='cardContainer'>
          {db.map((meme, index) =>
            <TinderCard ref={childRefs[index]} className='swipe' key={meme.id} onSwipe={(direction) => swiped(direction, meme.id)} onCardLeftScreen={() => outOfFrame(meme.id)} >
              <div style={{ backgroundImage: 'url(' + meme.url + ')' }} className='card'></div>
            </TinderCard>
          )}
        </div>
        {direction ? <h2 className='infotext'>This meme is {choice}</h2> : <h2>Start swiping!</h2> }
      </div>
      <div>
        <button onClick={() => swipe('left')}>Swipe left!</button>
        <button onClick={() => swipe('up')}>Swipe up!</button>
        <button onClick={() => swipe('down')}>Swipe down!</button>
        <button onClick={() => swipe('right')}>Swipe right!</button>
      </div>

    </>
  )
}

export default App
