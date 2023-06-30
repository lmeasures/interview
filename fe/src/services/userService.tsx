

export const getUsers = async (searchText: string) => {
    // return await fetch(`http://interview-api.interview_default/userSearch?search=${searchText}`, { // <- This doesn't work because of unknown insanity.
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