import { Card } from 'antd';
import React from 'react';
import './App.css';
import { counties } from './data/counties';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {counties.map(country => (
           <Card size="small" title={`${country.name} ${country.emoji}`} style={{ width: 300 }}>
           <p>Group: {country.group}</p>
         </Card>
        ))}
        </header>
    </div>
  );
}

export default App;
