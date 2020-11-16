import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import useFetch from 'use-http';

const Home = () => {
  const [members, setMembers] = useState([])
  const history = useHistory();
  // BREAK THE SPACE IN 3001 TO SHOW THE ERROR 
  const { error, loading, get, response } = useFetch('http://localhost:3001/members',
    { cachePolicy: 'network-only' })

  useEffect(() => {
    getMemberData()
  }, [])


  async function getMemberData() {
    const details = await get()
    if (response.ok) setMembers(details)
  };

  const goToIndividual = person => {
    console.log('person', person)
    history.push(`/individual/${person.name}`)
  }



  return (
    <>
      { error && <div>"Sorry people, the data did not load correctly"</div>}
      { loading && <h1>LOADING..................PUT SPINNER HERE</h1>}
      { members && members.map(indv => {
        return (
          <ul onClick={goToIndividual(indv)} key={indv.name}>
            <li>{indv.name}</li>
            <li>{indv.company}</li>
          </ul>
        )
      })}

    </>
  )
}

export default Home;