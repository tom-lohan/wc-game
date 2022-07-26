import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
    render(<App />)
    const landingPage = screen.getByTestId('landing_page')
    expect(landingPage).toHaveTextContent('World Cup 2022 Sweepstakes')
})
