import React from 'react'

export default function RivalCard({sprite}) {

  return (
    <div className='playerCard'>
      <div
        className='pokemonSprite'
      >
        <img src={sprite} alt='pokemon' />
      </div>
    </div>
  )
}
