import React, {Component}from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';



class ContactData extends Component{
    state ={
       orderForm:{
       name:{
           elementType: 'input',
           elementConfig:{
               type:'text',
               placeholder:'your name',
           },
           value:''
       },
            
             street: {
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'street',
                },
                value:''
            },
            country:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'country',
                },
                value:''
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder:'your mail',
                },
                value:''
            },
            dileveryMethod:{
                elementType: 'select',
                elementConfig:{
                    Option:[{value:'fastets', displayValue:'Fastests'},
                    {value:'cheapest', displayValue:'cheapest'}]
                },
                value:''
            },
    },
        loading:false,
};
    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading:true });
        //alert('You Continue!');
        const order = {
            ingredents: this.props.ingredents,
            price: this.props.price,}
           axios.post('/order.json',order)
        .then(response =>{
            this.setState({loading:false });
            this.props.history.push('/');
        })
          .catch(error =>{
                this.setState({loading:false })  
    })
    } 

render(){
    let form = ( <form>
        <Input inputtype ="input" type = "text" name = "name" placeholder ="yourName"/>
        <Input inputtype ="input" type = "text" name = "email" placeholder ="youreMail"/>
        <Input inputtype ="input"  type = "text" name = "street" placeholder ="Street"/>
        <Input inputtype ="input"  type = "text" name = "postal" placeholder ="postalPode"/>
        <Button btntype ="Success" clicked ={this.orderHandler}>ORDR</Button>
   </form>
   );
    if (this.state.loading){
        form = <Spinner/>;
    }
    
    return(
    <div className ={Classes.ContactData}>
        <h4>Enter Your Data</h4>
       {form}
    </div>);
    
}
}

export default ContactData;