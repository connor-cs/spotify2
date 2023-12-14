import {useEffect} from 'react'
import TestCard from '../components/TestCard'
import { loginCallback } from '../utils/Login'

const Home = ({results}) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log({ code })

    if (code) {
      loginCallback()
    }
  }, [])

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