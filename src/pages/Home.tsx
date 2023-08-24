import React from 'react'
import TestCard from '../components/TestCard'

const Home = ({results}) => {
  return (
    <div className='.bg-dark'>Home
      {results.length != 0 ? (
        <div className="results-container">
          {results?.map((res) => (
            <TestCard props={res} key={res.id}/>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Home