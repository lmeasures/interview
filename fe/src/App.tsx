import React from 'react';
import './App.scss';
import SearchBox from './components/searchBox/searchBox';
import { getUsers } from './services/userService';
import ListBox from './components/searchSuggestions/listBox';
import { INewUser, UserModel } from './types/userTypes';


const blankNewUserObj: INewUser = {
  firstname: "",
  lastname: "",
  role: "",
  email: "",
  phone: ""
}

const App = () => {
  const [searchText, setSearchText] = React.useState('');
  const [searchSuggestions, setSearchSuggestions] = React.useState<Array<UserModel>>([]);
  const [searchSuggestionsVisible, setSearchSuggestionsVisible] = React.useState<boolean>(false);
  const [searchResults, setSearchResults] = React.useState<Array<UserModel>>([]);
  const [displaySearchResults, setDisplaySearchResults] = React.useState<boolean>(false); 
  const [newUserModalVisible, setNewUserModalVisible] = React.useState<boolean>(false);
  const [newUserData, setNewUserData] = React.useState<INewUser>(blankNewUserObj);

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
    setNewUserModalVisible(false);
    console.log(newUserData);

    // TODO validate in the UI for phone and email using regex

    // TODO submit data
    // TODO response

    setNewUserData(blankNewUserObj);
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
          <input id="AddUser-FirstName" className="AddUser-NameField" placeholder="First Name" onChange={(e)=>setNewUserData({...newUserData, firstname: e.target.value})}/>
          <input id="AddUser-LastName" className="AddUser-NameField" placeholder="Last Name" onChange={(e)=>setNewUserData({...newUserData, lastname: e.target.value})}/>
          <input id="AddUser-Jobtitle" className="AddUser-DetailField" placeholder="Job title" onChange={(e)=>setNewUserData({...newUserData, role: e.target.value})}/>
          <input id="AddUser-Phone" className="AddUser-DetailField" placeholder="Phone" onChange={(e)=>setNewUserData({...newUserData, phone: e.target.value})}/>
          <input id="AddUser-Email" className="AddUser-DetailField" placeholder="Email" onChange={(e)=>setNewUserData({...newUserData, email: e.target.value})}/>
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
