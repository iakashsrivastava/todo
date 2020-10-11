const headers = {  
    'X-Api-Key': process.env.REACT_APP_API_KEY ?? '',
    'Content-Type': 'application/json',
};

export const get = async () => {
    let output = [];
    try{
        const requestOptions = {method: 'GET', headers};
        const response = await fetch(process.env.REACT_APP_GET_URL ?? '', requestOptions);
        output = await response.json();
    } catch{};
    return output;
};

export const patch = async (todoId: number) => {
    let output = {"status": "fail"}
    try{
        const requestOptions = {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ "isComplete": true })
        };
        const response = await fetch(`${process.env.REACT_APP_PATCH_URL ?? ''}${todoId}`, requestOptions);
        output = await response.json();
    } catch{};
    return output;
};