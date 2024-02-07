import {combineReducers} from "redux";
import Alert from "./alert";
import Auth from "./auth";
import Configuration from "./config";
import Assets from "./assets";
import Store from "./store";
import Management from "./management";

export default combineReducers({
    Alert, Auth, Configuration, Assets, Store, Management
});
