const host = 'http://localhost:3000';

function fetchGET(url) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            dataType: 'json',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'text/plain;charset=UTF-8',
            }),
        }).then((response) => {
            response.json().then((res) => {
                // console.log(res);
                resolve(res);
            }, (res) => {
                reject(res);
            });
        });
    });
}

function fetchPOST(url, params) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            dataType: 'json',
            body: JSON.stringify(params),
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'text/plain;charset=UTF-8',
            }),
        }).then((response) => {
            response.json().then((res) => {
                resolve(res);
            }, (res) => {
                reject(res);
            });
        });
    });
}

export default {
    APIhost: host,
    fget: fetchGET,
    fpost: fetchPOST,
};
