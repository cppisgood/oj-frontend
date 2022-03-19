import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from './About';
import { Provider } from 'react-redux';
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Home } from './Home';
import { CookiesProvider } from 'react-cookie';
import { User } from './User';
import { Problem } from './Problem';
import { ProblemEditor } from './ProblemEditor'
import { Problems } from './Problems';

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<App />} >
                                <Route path="/" element={<Home />} />
                                <Route path="about" element={<About />} />
                                <Route path="user">
                                    <Route path=":username" element={<User></User>}></Route>
                                </Route>
                                <Route path="problem">
                                    <Route path=":problem_id" element={<Problem></Problem>}></Route>
                                </Route>
                                <Route path="problems" element={<Problems></Problems>}></Route>
                                <Route path="problem-editor" element={<ProblemEditor></ProblemEditor>}>
                                </Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
