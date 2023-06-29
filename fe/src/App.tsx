import React from 'react';
import './App.scss';
import SearchBox from './components/searchBox';
import { getUsers } from './services/userService';

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
    if(searchText){
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
    setSearchSuggestionsVisible(false);
  }

  const highlightText = (text: string, searchText: string) => {
    const textArray = text.toLowerCase().split(searchText.toLowerCase());
    if(textArray.length > 1){
      return (
        <>
          {text.substring(0, textArray[0].length)}<span className="SearchSuggestions-HighlightedText">{searchText}</span>{text.substring(text.length-textArray[1].length)}
        </>
      )
    }
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
      <div className="SearchSuggestions-Container">
        <ul className="SearchSuggestions-List">
          {searchSuggestions.map((item, index)=>(
              <li key={index} className="SearchSuggestions-Item" onClick={() => {handleSuggestionClicked(item.name)}}>
                {highlightText(item.name, searchText)}
              </li>
          ))}
        </ul>
      </div>
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
