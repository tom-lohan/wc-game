import React from 'react'
import './App.css'
import { counties } from './data/counties'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="text-center text-3xl font-bold underline p-5">
                    Hello world!
                </h1>
                <main className="flex flex-wrap gap-4">
                    {counties.map((country) => (
                        <div className="m-3 p-3 border border-zinc-400 rounded">
                            <p>Name: {country.name}</p>
                            <p>Group: {country.group}</p>
                        </div>
                    ))}
                </main>
            </header>
        </div>
    )
}

export default App
