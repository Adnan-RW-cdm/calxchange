import { registerRootComponent } from 'expo';
import App from '../App'; //main App component

registerRootComponent(App);

//basically this file makes App.js my root component. 
//cuz somehow expo setup wouldn't let me do it any other way