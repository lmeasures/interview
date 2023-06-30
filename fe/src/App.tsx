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
  const [newUserModalVisible, setNewUserModalVisible] = React.useState<boolean>(false)

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
    console.log(text);
    handleSubmit(text);
    setSearchText(text);
  }

  const toggleNewUserModal = (override?: boolean) => {
    setNewUserModalVisible(override ?? !newUserModalVisible);
  }

  const submitNewUser = () => {

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

      <button 
        className="AddUser-Button"
        onClick={() => {toggleNewUserModal()}}
        style={{
          position:"absolute",
          bottom:"2vh"
        }}
      >
        New User +
      </button>

      {newUserModalVisible && (
      <div className="AddUser-Container">
          <input id="AddUser-FirstName" className="AddUser-NameField" placeholder="First Name"/>
          <input id="AddUser-LastName" className="AddUser-NameField" placeholder="Last Name"/>
          <input id="AddUser-Jobtitle" className="AddUser-DetailField" placeholder="Job title"/>
          <input id="AddUser-Phone" className="AddUser-DetailField" placeholder="Phone"/>
          <input id="AddUser-Email" className="AddUser-DetailField" placeholder="Email"/>
          <button 
            className="AddUser-Button"
            onClick={() => {submitNewUser()}}
          >
            Create
          </button>
      </div>
      )}

    </div>
  );
}

export default App;
