import React from 'react';
import ReactDom from 'react-dom';
import { App } from "./components/app";
import { AppContext } from "./api/contextProvider";

ReactDom.render(
    <React.StrictMode>
        <AppContext>
            <App />
        </AppContext>
    </React.StrictMode>,
    document.getElementById('root'));
