import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import CheckOutSummary from '../../components/Order/CheckOutSummary';
import ContactData from './ContactData/ContactData';


class CheckOut extends Component{
    state = {
        ingredents: null,
        price:0
    
    };

    componentWillMount(){
    console.log(this.props)

        const query = new URLSearchParams(this.props.location.search);
        const ingredents ={};
        let price = 0;
        for ( let param of query.entries()){
            console.log(param )
            if(param[0] === 'price') {
                console.log(param )
            price = param[1];
            }else{
                ingredents[param[0]] = + param[1]; // param[1] + 1
            }
            
        }

        this.setState({ingredents:ingredents,totalprice:price});
        console.log(this.state.ingredents)
    }

    checkoutCancelledHandler = () =>{
    this.props.history.goBack();
    };

    checkoutContinuedHandler = () =>{
    this.props.history.replace('/CheckOut/ContactData');
    };
render(){
    console.log(this.props)

    return(
        <div>
            <CheckOutSummary 
            ingredents ={this.state.ingredents}
            checkoutCancelled ={this.checkoutCancelledHandler}
            checkoutContinued = {this.checkoutContinuedHandler}/>
<Route 
path ={this.props.match.path + '/ContactData'}
 render = {(props) => (<ContactData
 ingredents = {this.state.ingredents}
 price = {this.state.totalPrice} {...props}/>)}/> 
        </div>
    )
}

}       
export default CheckOut;