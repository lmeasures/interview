

export const getUsers = async (searchText: string) => {
    return await fetch(`https://interview-api-1.interview_default:3001?search=${searchText}`, {
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