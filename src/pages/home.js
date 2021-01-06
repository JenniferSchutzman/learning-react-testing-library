/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import useFetch from 'use-http';

const Home = () => {
  const [members, setMembers] = useState([])
  const history = useHistory();
  // BREAK THE SPACE IN 3001 TO SHOW THE ERROR 
  const { error, loading, get, response } = useFetch('http://localhost:3001',
    { cachePolicy: 'network-only' })
  // const { error, loading, get, response } = useFetch('http://localhost:3001')

  useEffect(() => {
    getMemberData()
  }, [])

  async function getMemberData() {
    const details = await get('/members')
    console.log('details', details.data)
    if (response.ok) setMembers(details)
  };

  const goToIndividual = person => {
    // console.log('just hit function for now.  Will mock history after')

    // history.push({
    //   pathname: `/individual/${person.name}`,
    //   state: person
    // })
    console.log('inside goToIndividual', person)
    history.push({
      pathname: `/individual/JennySchutzman`,
      state: person
    })
  }

  const JennyData = {
    id: 1,
    name: "Jenny Schutzman",
    company: "Tallo",
    commonLanguage: "Javascript",
    hasDog: false
  }

  const goToForm = () => {
    history.push('/form')
  }


  return (
    <>
      <h1 data-testid="testing" >testing output</h1>
      <button onClick={goToForm}> go to form</button>
      <ul data-testid="ul" onClick={() => goToIndividual(JennyData)}>
        <li data-testid="li"> testing to see if it's an issue with the return statement </li>
      </ul>

      <button >Click</button>
      { error && <div>"Sorry people, the data did not load correctly"</div>}
      { loading && <h1>LOADING..................PUT SPINNER HERE</h1>}
      {members && members.map(indv => {
        return (
          <ul onClick={() => goToIndividual(indv)} key={indv.name}>
            <li>{indv.name}</li>
            <li data-testid="company" >{indv.company}</li>
          </ul>
        )
      })}
    </>
  )
}

export default Home;