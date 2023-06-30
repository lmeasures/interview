import React from 'react';
import './App.scss';
import SearchBox from './components/searchBox/searchBox';
import { getUsers } from './services/userService';
import ListBox from './components/searchSuggestions/listBox';

interface UserModel {
  name: string,
  role: string,
  email: string,
  phone: string
}

const App = () => {
  const [searchText, setSearchText] = React.useState('');
  const [searchSuggestions, setSearchSuggestions] = React.useState<Array<UserModel>>([]);
  const [searchSuggestionsVisible, setSearchSuggestionsVisible] = React.useState<boolean>(false);
  const [searchResults, setSearchResults] = React.useState<Array<UserModel>>([]);
  const [displaySearchResults, setDisplaySearchResults] = React.useState<boolean>(false); 

  React.useEffect(() => {
    if(searchText && searchText.length > 1){
      populateSuggestions();
    }
    else {
      setSearchSuggestionsVisible(false);
    }
  }, [searchText])

  React.useEffect(() => {
    setDisplaySearchResults(!!searchResults);
  })

  const populateSuggestions = async () => {
    const results: UserModel[] = await getUsers(searchText)
    if(results.length === 0) {
      setSearchSuggestionsVisible(false);
      return 
    };
    setSearchSuggestions(results);
    setSearchSuggestionsVisible(true);
  }

  const handleSubmit = async (text?: string) => {
    const results: UserModel[] = await getUsers(text ?? searchText)
    if(!results) return;
    setSearchResults(results);
  }

  const handleSuggestionClicked = async (text: string) => {
    handleSubmit(text);
    setSearchText(text);
  }


  return (
    <div className="App">

      <SearchBox 
        value={searchText} 
        onChange={setSearchText} 
        onSubmit={handleSubmit}
        onBlur={() => {setSearchSuggestionsVisible(false)}}
      />
      
      {searchSuggestionsVisible && (
        <ListBox 
          textList={searchSuggestions.map((a)=>a.name)} 
          searchText={searchText} 
          handleItemClicked={(text) => handleSuggestionClicked(text)}
        />
      )} 

      {displaySearchResults && (
      <div className="SearchResults-Container">
        <div className="SearchResults-List">
          {searchResults.map((item, index)=>(
              <div className="SearchResults-Item">
                <h3 className="SearchResults-Item-Title">{item.name}</h3>
                <p className="SearchResults-Item-Detail">
                  {item.role}<br/>
                  {item.phone}<br/>
                  {item.email}
                </p>
              </div>
            
          ))}
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
