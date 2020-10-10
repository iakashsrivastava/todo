export const get = async ()=>{
    const response = await fetch("https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get", {
        method: 'GET',
        headers: {  
            'X-Api-Key': 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Accept': 'application/json'
        }
    });
    return await response.json();
};

