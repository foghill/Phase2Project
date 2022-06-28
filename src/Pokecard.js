import React from 'react'
const POKE_API ='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'


function Pokecard({name,id,type,exp}) {
    let imgSrc = `${POKE_API}${id}.png`
  return (
    <div className='Pokecard'>
        <h1>{name}</h1>
        <img src={imgSrc} alt={name} />
    </div>
  )
}

export default Pokecard