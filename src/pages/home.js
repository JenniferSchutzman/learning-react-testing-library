import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import useFetch from 'use-http';

const Home = () => {
  const [members, setMembers] = useState([])
  const history = useHistory();
  // BREAK THE SPACE IN 3001 TO SHOW THE ERROR 
  // const { error, loading, get, response } = useFetch('http://localhost:3001/members',
  const { get, response, error, loading } = useFetch('http://localhost:3001/members',
    { cachePolicy: 'network-only' })

  useEffect(() => {
    getMemberData()
  }, [])


  // async function getMemberData() {
  //   const details = await get()
  //   if (response.ok) setMembers(details)
  // };

  const getMemberData = () => {
    setMembers([
      {
        id: 1,
        name: "Jenny Schutzman",
        company: "Tallo",
        commonLanguage: "Javascript",
        hasDog: false
      },
      {
        id: 2,
        name: "Anna Fulton",
        company: "Sovereign",
        commonLanguage: "Javascript",
        hasDog: true
      },
      {
        id: 3,
        name: "Liah Wallace",
        company: "Boomtown",
        commonLanguage: "PhP",
        hasDog: null
      }
    ])
  }

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
    // <>
    //   { error && <div>"Sorry people, the data did not load correctly"</div>}
    //   { loading && <h1>LOADING..................PUT SPINNER HERE</h1>}
    //   { members && members.map(indv => {
    //     return (
    //       <ul onClick={() => goToIndividual(indv)} key={indv.name}>
    //         <li>{indv.name}</li>
    //         <li>{indv.company}</li>
    //       </ul>
    //     )
    //   })}

    // </>
    <>
      <h1 data-testid="testing" >testing output</h1>
      <button onClick={goToForm()}> go to form</button>
      <ul data-testid="ul" onClick={() => goToIndividual(JennyData)}>
        <li data-testid="li"> testing to see if it's an issue with the return statement </li>
      </ul>
      {/* <button data-testid="history.push.click" onClick={() => goToIndividual(JennyData)}>Click</button> */}
      <button >Click</button>
      { error && <div>"Sorry people, the data did not load correctly"</div>}
      { loading && <h1>LOADING..................PUT SPINNER HERE</h1>}
      {members && members.map(indv => {
        return (
          // <>
          //   <h1>Testing return</h1>
          <ul onClick={() => goToIndividual(indv)} key={indv.name}>
            <li>{indv.name}</li>
            <li data-testid="company" >{indv.company}</li>
          </ul>
          // </>
        )
      })}
    </>
  )
}

export default Home;