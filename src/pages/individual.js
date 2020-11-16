import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from 'use-http';

const Individual = () => {
  const [personData, setPersonData] = useState({});
  const { name } = useParams();
  console.log('name', name)
  const location = useLocation();

  useEffect(() => {
    console.log("location", location)
  }, [])


  return (
    <>
      { personData && (
        <>
          <div>{personData.img}</div>
          <div>{personData.name}</div>
        </>
      )}
    </>
  )
}

export default Individual;