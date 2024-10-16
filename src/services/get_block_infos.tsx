interface block_info {
    block_height: string;
}

export function fetchBlockHeight() {
    return fetch('/api/block_info/block_height', {
        method: 'GET',
        headers: {
        'content-type': 'application/json',
        },
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
        if(!response.ok) {
            return response.json()
            .then( err => Promise.reject(err));
        }
        return response.json();
    })    
    .then(data => {
        console.log('Block Height:', data); // Log the data
        return data;  // Return the parsed JSON data
    });
}