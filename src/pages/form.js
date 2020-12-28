import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'

const Form = () => {
  const [name, setName] = useState('')
  const [emails, setEmails] = useState([])
  const history = useHistory();

  useEffect(() => {
    setName("First Email List Name")
    setEmails(["email1@one.com", "email2@two.com"])
  }, [])

  // const organizeEmails = 
  const handleSubmit = () => {
    const stateObject = {
      name: name,
      emails: emails
    }
    history.push({
      pathname: 'afterForm',
      state: stateObject
    })

  }

  return (
    <form id="editEmailList" data-testid="form-onSubmit" onSubmit={handleSubmit}>
      <input
        type="text"
        label="Name"
        data-testid="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <div />
      <textarea
        label="Emails"
        data-testid="emails"
        value={emails}
        onChange={event => setEmails(event.target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form;