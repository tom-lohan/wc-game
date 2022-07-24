import { Card } from 'antd';
import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import { counties } from './data/counties';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <main className='counties'>
        {counties.map(country => (
           <Card size="small" title={`${country.name} ${country.emoji}`} className="countryCard">
           <p>Group: {country.group}</p>
         </Card>
        ))}
        </main>
        </header>
    </div>
  );
}

export default App;
