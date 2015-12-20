/*global Promise */

import preventRaceCondition from './utils/preventRaceCondition.js';

export default function tokenStorage({initialToken, fetchToken, generateToken}) {
    let _tokenPromise = initialToken;
    if(_tokenPromise && !(_tokenPromise instanceof Promise)) {
        _tokenPromise = Promise.resolve(initialToken);        
    }

    let _fetchToken = fetchToken ? preventRaceCondition(fetchToken) : () => Promise.reject(new Error('Getting a token from the server is not supported'));
    let _generateToken = generateToken ? preventRaceCondition(generateToken) : () => Promise.reject(new Error('Generating a token on the server is not supported'));

    const getToken = () => {
        if(_tokenPromise) {
            return _tokenPromise;
        }
        return _tokenPromise = new Promise((resolve, reject) => {
            _fetchToken()
                .then(resolve)
                .catch(err => _generateToken(err).then(resolve, reject));
        });
    };

    const refreshToken = () => {
        return _tokenPromise = new Promise((resolve, reject) => {
            _generateToken().then(resolve, reject);
        });
    };

    return {
        getToken,
        refreshToken
    };
}
