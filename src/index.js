import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <App/>
</React.StrictMode>);
