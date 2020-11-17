import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';


const Individual = () => {
  const [personData, setPersonData] = useState({});
  // const { name } = useParams();
  // console.log('name', name)
  const location = useLocation();

  useEffect(() => {
    console.log("location", location)
    setPersonData(location.state)
  }, [])


  return (
    <>
      { personData && (
        <>
          <div>{personData.name}</div>
          <div>Company: {personData.company}</div>
          <div>Frequently Used Language: {personData.commonLanguage}</div>
        </>
      )}
    </>
  )
}

export default Individual;