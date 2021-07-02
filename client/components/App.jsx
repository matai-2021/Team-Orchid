import React, { useState, useMemo } from 'react'
import TinderCard from 'react-tinder-card'
import { FaRegAngry } from 'react-icons/fa'
import BasedMemes from './BasedMemes'
import { Link } from 'react-router-dom'

import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { BiHappyHeartEyes } from 'react-icons/bi'

import db from '../../server/data/data'

const alreadyRemoved = []
let memeState = db
const basedArray = []

const App = () => {
  // const memes = db
  const [direction, setDirection] = useState()
  const [choice, setChoice] = useState()
  const [memes, setMemes] = useState(db)
  const [newArray, setBasedArray] = useState([])

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, meme) => {
    setBasedArray(basedArray)
    setDirection(direction)
    switch (direction) {
      case 'right':
        setChoice('based')
        db.map(item => (item.id === meme ? basedArray.push(item.url) : null))
        break
      case 'left':
        setChoice('cringe')
        break
      case 'up':
        setChoice('SUPER BASED')
        db.map(item => (item.id === meme ? basedArray.push(item.url) : null))
        break
      case 'down':
        setChoice('illegal')
    }
  }

  console.log(newArray)

  const outOfFrame = (id) => {
    console.log(id + ' left the screen!')
    memeState = memeState.filter(meme => meme.id !== id)
    setMemes(memeState)
  }

  const swipe = (direction) => {
    const memesLeft = memes.filter(meme => !alreadyRemoved.includes(meme.id))
    if (memesLeft.length) {
      const toBeRemoved = memesLeft[memesLeft.length - 1].id // Find the card object to be removed
      const index = db.map(meme => meme.id).indexOf(toBeRemoved)
      console.log(toBeRemoved + 'hi')// Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(direction) // Swipe the card!
    }
  }

  return (
    <>
      <div className='biggestBox'>
        <div><img src={memes[0].url} alt='title' className='title'/></div>
        <div className='cardContainer'>
          {db.map((meme, index) =>
            <TinderCard ref={childRefs[index]} className='swipe' key={meme.id} onSwipe={(direction) => swiped(direction, meme.id)} onCardLeftScreen={() => outOfFrame(meme.id)} >
              <img src={meme.url} alt='memes' className='card'/>
            </TinderCard>
          )}
        </div>
        {direction ? <h2 className='infotext'>This meme is {choice}</h2> : <h2>Start swiping!</h2> }
      </div>
      <div className='daButtons'>
        <button onClick={() => swipe('left')}><AiOutlineDislike className='thumbDown' /></button>
        <button onClick={() => swipe('down')}><FaRegAngry className='illegal'/></button>
        <button onClick={() => swipe('up')}><BiHappyHeartEyes className='superBased'/></button>
        <button onClick={() => swipe('right')}><AiOutlineLike className='thumbUp'/></button>
      </div>
      {newArray.map(based => (
        <img key={based} src={based} alt='memes' className='flex'/>
      ))}
    </>
  )
}

export default App
