const headers = {  
    'X-Api-Key': process.env.REACT_APP_API_KEY ?? '',
    'Content-Type': 'application/json',
};

export const get = async () => {
    const requestOptions = {method: 'GET', headers};
    const response = await fetch(process.env.REACT_APP_GET_URL ?? '', requestOptions);
    return await response.json();
};

export const patch = async (todoId: number) => {
    const requestOptions = {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ "isComplete": true })
    };
    const response = await fetch(`${process.env.REACT_APP_GET_URL ?? ''}${todoId}`, requestOptions);
    return await response.json();
};