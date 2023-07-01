import { UserModel } from "../types/userTypes";


export const getUsers = async (searchText: string) => {
    return await fetch(`http://localhost:3001/userSearch?search=${searchText}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(async (response) => {
          if(response.status===200) return (await response.json());
          else return null
    })
    .catch((e) => {
        console.error("Error occurred during search: ", e);
        return null
    });
  }

export const submitNewUser = async (newUserData: UserModel) => {
    return fetch(`http://localhost:3001/user/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({'newUserData': newUserData})
        
    })
    .then((response) =>{
        if(response.status === 201) console.log("is ok");
        return
    })
    .catch((e) => {
        console.error("Error occurred adding new user: ", e);
        return
    })
}