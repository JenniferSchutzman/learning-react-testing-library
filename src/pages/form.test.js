import { enableFetchMocks } from 'jest-fetch-mock'
import React from 'react'
import { cleanup, render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import fetchMock from 'jest-fetch-mock'
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history'
import { Router, MemoryRouter } from 'react-router-dom'


import Form from './form';

enableFetchMocks()

afterEach(() => {
  fetch.resetMocks()
})

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('the Form component', () => {
  afterEach(cleanup)

  // beforeEach(render(<Form />))

  test('populates the name in input', async () => {
    render(<Form />)
    const name = "First Email List Name"
    // wtf?!  This getByLabelText should work 
    // const input = screen.getByLabelText('Name')
    const input = screen.getByTestId('name')
    expect(input.value).toBe(name)

    // expect(screen.getByRole('button'))
  })

  test('populates the emails in textarea', async () => {
    render(<Form />)
    const emails = "email1@one.com,email2@two.com"
    const textArea = screen.getByTestId('emails')
    expect(textArea.value).toBe(emails)
  })

  test('submit the form data on submit button onClick', async () => {
    const handleSubmit = jest.fn();
    render(<Form onSubmit={handleSubmit} />)
    // works, but want to test more detail
    // expect(screen.getByRole('button')).toHaveTextContent('Submit')

    // setup mocks on the history push and state 
    const historyObject = { "pathname": "/individual/JennySchutzman", "state": { "commonLanguage": "Javascript", "company": "Tallo", "hasDog": false, "id": 1, "name": "Jenny Schutzman" } }
    expect(mockHistoryPush).toHaveBeenCalledWith(historyObject)

    // be sure to call the 'submit' instead of 'change' or 'click'
    // and call it on the form instead of the submit button 
    fireEvent.submit(screen.getByTestId('form-onSubmit'))
    expect(handleSubmit).toHaveBeenCalled()


  })

  test('routes user to the emailListDetail page along with the correct state', async () => {

  })

  // DONE.  GO BACK TO THE ADDEMAILLIST PAGE :) 

})