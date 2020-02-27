import React, { useState } from 'react'
import useInterval from '@use-it/interval';
import Blockies from 'react-blockies'
import randomString from 'randomstring'

const RandomIcon = () => {
    const [seed, setSeed] = useState(randomString.generate())

    useInterval(() => {
      setSeed(randomString.generate())
    }, 100)

    return (
        <Blockies seed={seed} scale={3} />
    )
}

export default RandomIcon