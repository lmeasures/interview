import React from 'react';
import './App.scss';
import SearchBox from './components/searchBox/searchBox';
import { getUsers, submitNewUser } from './services/userService';
import ListBox from './components/searchSuggestions/listBox';
import { INewUser, UserModel } from './types/userTypes';


const blankNewUserObj: INewUser = {
  firstname: "",
  lastname: "",
  role: "",
  email: "",
  phone: ""
}

type ISubmitStatus = 'failure' | 'success' | 'none';


const App = () => {
  const [searchText, setSearchText] = React.useState('');
  const [searchSuggestions, setSearchSuggestions] = React.useState<Array<UserModel>>([]);
  const [searchSuggestionsVisible, setSearchSuggestionsVisible] = React.useState<boolean>(false);
  const [searchResults, setSearchResults] = React.useState<Array<UserModel>>([]);
  const [displaySearchResults, setDisplaySearchResults] = React.useState<boolean>(false); 
  const [newUserModalVisible, setNewUserModalVisible] = React.useState<boolean>(false);
  const [newUserData, setNewUserData] = React.useState<INewUser>(blankNewUserObj);
  const [addUserStatus, setAddUserStatus] = React.useState<ISubmitStatus>('none');

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
    setSearchSuggestionsVisible(false);
  }, [searchResults])

  React.useEffect(() => {
    setTimeout(() => {
      setAddUserStatus('none');
    }, 3000);
  }, [addUserStatus && addUserStatus !== 'none'])

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
    const results: UserModel[] = await getUsers(text ?? searchText);
    if(!results) return;
    setSearchResults(results);
  }

  const handleSuggestionClicked = async (text: string) => {
    await setSearchText(text);
    await handleSubmit(text);
    setSearchSuggestionsVisible(false);
  }

  const toggleNewUserModal = (override?: boolean) => {
    setNewUserModalVisible(override ?? !newUserModalVisible);
  }

  const handleSubmitNewUser = async () => {
    setNewUserModalVisible(false);

    const newUser: UserModel = {
      name: `${newUserData.firstname} ${newUserData.lastname}`,
      email: newUserData.email.replaceAll(" ", "").replaceAll("\n", ""),
      phone: newUserData.phone.replaceAll(" ", "").replaceAll("\n", ""),
      role: newUserData.role
    }

    try{
      const response = await submitNewUser(newUser);
      console.log(response.status);
      if(response.status === 201) setAddUserStatus('success');
      else setAddUserStatus('failure');
    }
    catch(e){
      console.error("An error occurred when adding a new user: ", e)
      setAddUserStatus('failure');
    }
    setNewUserData(blankNewUserObj);
  }


  return (
    <div className="App" onClick={() => {setSearchSuggestionsVisible(false)}}>

      <SearchBox 
        value={searchText} 
        onChange={setSearchText} 
        onSubmit={handleSubmit}
        onBlur={()=>{}}
      />
      
      {searchSuggestionsVisible && (
        <ListBox 
          textList={searchSuggestions.map((a)=>a.name)} 
          searchText={searchText} 
          handleItemClicked={handleSuggestionClicked}
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
        <form className="AddUser-Container" onSubmit={() => handleSubmitNewUser()}>
          <input maxLength={100} required className="AddUser-NameField" placeholder="First Name" onChange={(e)=>setNewUserData({...newUserData, firstname: e.target.value})}/>
          <input maxLength={100} required className="AddUser-NameField" placeholder="Last Name" onChange={(e)=>setNewUserData({...newUserData, lastname: e.target.value})}/>
          <input maxLength={100} required className="AddUser-DetailField" placeholder="Job title" onChange={(e)=>setNewUserData({...newUserData, role: e.target.value})}/>
          <input maxLength={11} pattern="^\d{11}$" required className="AddUser-DetailField" placeholder="Phone" onChange={(e)=>setNewUserData({...newUserData, phone: e.target.value})}/>
          <input type="email" required className="AddUser-DetailField" placeholder="Email" onChange={(e)=>setNewUserData({...newUserData, email: e.target.value})}/>
          <button 
            className="AddUser-Button"
          >
            Create
          </button>
        </form>
      )}

      <div className="AddUser-SubmitStatus" >
        {addUserStatus === 'success' && (
          <div className="AddUser-SubmitStatus-Success">
            &#x2714;
          </div>
        )}
        {addUserStatus === 'failure' && (
          <div className="AddUser-SubmitStatus-Failure">
            &#10006;
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
