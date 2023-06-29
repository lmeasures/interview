

export const getUsers = async (searchText: string) => {
    return await fetch(`https://interview-api-1.interview_default:3001?search=${searchText}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(async (response) => {
        console.log("Response!", response);
        return await response.json();
    })
    .catch(async (e) => {
        console.error("error occurred during search: ", e);
        return await new Response(null, {status: 500, statusText: "Error getting Users"}).json();
    });
  }