import { enableFetchMocks } from 'jest-fetch-mock'
import React from 'react'
import { cleanup, render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import fetchMock from 'jest-fetch-mock'
// import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history'
import { Router, MemoryRouter } from 'react-router-dom'

import Home from './home';

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

describe('render the Home component', () => {
  afterEach(cleanup)
  // api mocks 
  fetch.mockResponseOnce(JSON.stringify([
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
  ]
  ))

  test('calls the GET, returning hte name correctly', async () => {
    render(<Home />)
    // i hate this test.  It feels like cheating but i can't find another way to point specifically to that item in the mapped array. 
    // When I try to match 'listitem' role it yells at me that there are multiple so I guess this is the only way.
    await waitFor(() => expect(screen.getByText(/Jenny Schutzman/i)).toHaveTextContent('Jenny Schutzman'))
  })

  test('calls the GET, returning the company data correctly', async () => {
    // thinking toBeInTheDocument might be deprecated as well eventhough stil in documentation (like toDisplayValue)
    //  await waitFor(() => expect(screen.getByText(/Tallo/i)).toBeInTheDocument())
    render(<Home />)
    await waitFor(() => expect(screen.getByText(/Tallo/i)).toHaveTextContent(('Tallo')))
    // I NEED TO UNDERSTAND WHY THIS DOES NOT WORK WITH FIND BY!!!  CAUSING ISSUES IN THE APP AS WELL.
    // NOW FINDS MULITPLE WHEN I USE QUERYBY toContain('Tallo')
    // NOT SURE WHAT TO CALL AFTER QUERAY ALL BY TEST ID BC NOT REALLY A SINGLE VALUE OR AN ARRAY
    // JEST SITE SAYS I SHOULD BE ABLE TO USE TOMATCHOBJECT ON ARRAYS AS WELL 
    // expect(screen.queryAllByTestId('company')).toMatchObject([<li data-testid="company">Tallo</li>, <li data-testid="company">Sovereign</li>, <li data-testid="company">Boomtown</li>])
  })
  test('that I understand find by with jest matchers on non-arrays', async () => {
    render(<Home />)
    // REVIEW WITH IAN - NOT SURE WHY THIS DOESN"T WORK BUT THE NEXT TEST BY ID DOES
    expect(screen.getByTestId("testing")).toHaveTextContent("testing output")
  })

  test('li has correcnt content', async () => {
    render(<Home />)
    expect(screen.getByTestId('li')).toHaveTextContent("testing to see if it's an issue with the return statement")
  })

  test('accessibility works on the header', async () => {
    render(<Home />)
    expect(screen.getByRole('heading')).toHaveTextContent('testing output')
  })

  // test('it has a button that says click', async () => {
  //   render(<Home />)
  //   // SHOW IAN, TOCONTAIN LEADS TOMATCHOBEJCT WHICH LEADS TOBE , with non working
  //   expect(screen.getAllByRole('button')[0]).toBe(<button> go to form</button>)
  // })

  test('the the onClick of the ul will send you to the new url', async () => {
    const goToIndividual = jest.fn();
    render(
      <MemoryRouter>
        <Home goToIndividual={goToIndividual} />
      </MemoryRouter>
    )

    // fireEvent.click(await waitFor(() => screen.findByTestId('ul')));
    // expect(screen.getByTestId("ul")).toBeDefined();
    const button = screen.getAllByTestId('ul');
    fireEvent.click(button[0]);
    // expect(goToIndividual).toHaveBeenCalled();
    const historyObject = { "pathname": "/individual/JennySchutzman", "state": { "commonLanguage": "Javascript", "company": "Tallo", "hasDog": false, "id": 1, "name": "Jenny Schutzman" } }
    expect(mockHistoryPush).toHaveBeenCalledWith(historyObject)
  })



})