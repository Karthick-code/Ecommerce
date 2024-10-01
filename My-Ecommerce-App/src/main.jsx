



import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; // Make sure to import your store
import WrappedApp from './App'; // Import the wrapped App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}> {/* Wrap your App with Provider */}
        <WrappedApp />
    </Provider>
);

