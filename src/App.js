import React from 'react';
import store, {Persistor} from "./store";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import Error404 from "./containers/errors/Error404";
import Login from "./containers/auth/Login";
import './styles/index.css';
import Resources from "./containers/pages/Resources";
import ThirdParties from "./containers/pages/ThirdParties";
import Assets from "./containers/pages/Assets";
import Storage from "./containers/pages/Storage";
import Tools from "./components/Assets/Tools";
import Equipments from "./components/Assets/Equipments";
import Facilities from "./components/Assets/Facilities";
import WorkOrder from "./containers/pages/WorkOrder";
import Config from "./containers/pages/Config";
import Store from "./containers/pages/Store";
import FormEquipments from "./components/Assets/FormEquipments";
import ChangePassword from "./components/auth/Password";
import Requirements from "./containers/pages/Requirements";
import RegisterOrder from "./containers/pages/RegisterOrder";
import Home from "./containers/pages/Home";


const App = () => {

    return (<Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>

            <Router>
                <Routes>
                    {/*Error Display*/}
                    <Route path="*" element={<Error404/>}/>

                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/personnel" element={<Resources/>}/>
                    <Route exact path="/thirdparties" element={<ThirdParties/>}/>

                    <Route exact path="/inventories/tree" element={<Assets/>}/>
                    <Route exact path="/inventories/facilities" element={<Facilities/>}/>
                    <Route exact path="/inventories/equipments" element={<Equipments/>}/>
                    <Route exact path="/inventories/equipments/edit" element={<FormEquipments/>}/>
                    <Route exact path="/inventories/tools" element={<Tools/>}/>
                    <Route exact path="/inventory/warehouses" element={<Store/>}/>
                    <Route exact path="/inventory/requirements" element={<Requirements/>}/>

                    <Route exact path="/storage/panel" element={<Storage/>}/>

                    <Route exact path="/tasks" element={<WorkOrder/>}/>
                    <Route exact path="/register" element={<RegisterOrder/>}/>


                    {/*Authentication*/}
                    <Route path="signin/" element={<Login/>}/>

                    <Route path="/personnel/user" element={<ChangePassword/>}/>
                    <Route path="/config" element={<Config/>}/>

                </Routes>
            </Router>
        </PersistGate>

    </Provider>);
}

export default App;