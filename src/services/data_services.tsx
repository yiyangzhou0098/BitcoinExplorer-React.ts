interface raw_daily_tx_count {
    date: string,
    tx_count: number,
}

interface chart_daily_tx_count {
    date: Date;
    tx_count: number;
}

interface fee_estimations {
    block_target: number,
    fee_rate: number,
    estimated_at: Date;
}


// Fetch function for Fee Estimations data
  export function fetchFeeEstimations(): Promise<fee_estimations[]> {
    return fetch('/api/fee_estimations', {
        method: 'GET',
        headers: {
        'content-type': 'application/json',
        },
    })
    .catch( err => Promise.reject({ error: err }) )
    .then( response => {
        if(!response.ok) {
            return response.json()
            .then( err => Promise.reject(err));
        }
        return response.json() as Promise<fee_estimations[]>;;
    })    
    .then(data => {
        console.log('fee estimations:', data); // Log the data
        return data.map(item => ({
            estimated_at: new Date(item.estimated_at),
            block_target: item.block_target,
            fee_rate: item.fee_rate
        })) // Return the parsed JSON data
    });
}
  

export function fetchAllTxData(): Promise<chart_daily_tx_count[]> {
    return fetch('/api/7d_tx', {
        method: 'GET',
        headers: {
        'content-type': 'application/json',
        },
    })
    .catch( err => Promise.reject({ error: err }) )
    .then( response => {
        if(!response.ok) {
            return response.json()
            .then( err => Promise.reject(err));
        }
        return response.json() as Promise<raw_daily_tx_count[]>;;
    })    
    .then(data => {
        console.log('7 days daily transaction numbers:', data); // Log the data
        return data.map(item => ({
            date: new Date(item.date),
            tx_count: item.tx_count,
        })) // Return the parsed JSON data
    });
}