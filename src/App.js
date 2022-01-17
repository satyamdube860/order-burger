import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import CheckOut from './container/CheckOut/CheckOut';
import Orders from './container/Orders/Orders';

class App extends Component {
  
  render() {
    return (
      <div >
        <Layout>
         <Switch>
           <Route path ="/CheckOut" component ={CheckOut}/> 
           <Route path ="/orders" component ={Orders}/>
           <Route path ="/" exact component ={BurgerBuilder}/>

         </Switch>
        </Layout>
      </div>
    );
  }
  
}

export default App;
