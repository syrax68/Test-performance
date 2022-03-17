import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export const usePut = (url) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const buttonRef = React.useRef(null);
    let buttonText = "";

    const handleDisable = (props) => {
        if (props && props?.disabled) {
            return props?.disabled;
        }

        return loading;
    }

    const fusion = (props) => {
        return {
            disabled: handleDisable(props),
            ref: buttonRef
        }
    }

    const putFunction = (params) => {
        setLoading(true);

        if (buttonRef?.current) {
            buttonText = buttonRef.current.textContent;
            let appContainer = document.createElement(`div`);
            const element = (<div className="h735-loading-spinner"> Loading</div>);

            ReactDOM.render (
                element,
                appContainer
            );

            buttonRef.current.innerHTML = appContainer.innerHTML;
        }

        return new Promise((resolve, reject) => {
            return axios.put(url, params)
            .then(response => {
                if (response) {
                    console.log(response)
                    setResponse(response);
                    setError(null);
                    setLoading(false);

                    if (buttonRef?.current) {
                        buttonRef.current.innerText = buttonText;
                    }
                    resolve(response);
                } else {
                    setLoading(false);
                    if (buttonRef?.current) {
                        buttonRef.current.innerText = buttonText;
                    }
                    resolve(response);
                    setError(true);
                }
            }).catch(error => {
                
                setError(error);

                setLoading(false);
                if (buttonRef?.current) {
                    buttonRef.current.innerText = buttonText;
                }
                reject(error);
            })
        })
    }

    // custom hook returns value
    return [putFunction, { response, error, loading, fusion }];
};