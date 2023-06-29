import React from 'react';
import './App.scss';
import SearchBox from './components/searchBox';
import { getUsers } from './services/userService';


const App = () => {
  const [searchText, setSearchText] = React.useState('');
  const [searchSuggestions, setSearchSuggestions] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    populateSuggestions();
  }, [searchText])

  const populateSuggestions = async () => {
    const results = await getUsers(searchText);
    setSearchSuggestions(results ?? []);
  }

  const handleSubmit = async () => {
    const results = await getUsers(searchText);
    setSearchResults(results ?? []);
  }

  return (
    <div className="App">
      <SearchBox value={searchText} onChange={setSearchText} onSubmit={handleSubmit}/>
    </div>
  );
}

export default App;
