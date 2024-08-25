import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState([]);

  const filterOptions = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestLowercase', label: 'Highest lowercase alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      // Change the URL to your local server
      const result = await axios.post('/bfhl', parsedInput);
      setResponse(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const filterResponse = () => {
    if (!response) return null;

    let filteredResponse = {};
    filters.forEach(filter => {
      if (filter.value === 'alphabets' && response.alphabets) {
        filteredResponse.alphabets = response.alphabets;
      }
      if (filter.value === 'numbers' && response.numbers) {
        filteredResponse.numbers = response.numbers;
      }
      if (filter.value === 'highestLowercase' && response.highestLowercase) {
        filteredResponse.highestLowercase = response.highestLowercase;
      }
    });

    return filteredResponse;
  };

  return (
    <div className="App">
      <h1>21BCE11630</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <>
          <Select
            isMulti
            options={filterOptions}
            onChange={setFilters}
            placeholder="Select filters"
          />
          <div className="response">
            <h2>Filtered Response:</h2>
            <pre>{JSON.stringify(filterResponse(), null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
