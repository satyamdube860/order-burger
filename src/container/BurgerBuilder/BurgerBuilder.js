import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDENT_PRICES ={
        salad: 0.5,
        cheese: 0.4,
        meat: 1.3,
        bacon:0.7
}
class BurgerBuilder extends Component {
    // const    ructor(props){
      //super(props);
      //this.state = {...}
     //}
    state = {
    ingredents :null,
    
    totalPrice:4,
    purchasable:false,
    purchasing: false,
    loading: false,
    error:false 
    }
    
    componentDidMount(){ 
        axios.get('https://react-my-burger-1a8cd-default-rtdb.firebaseio.com/ingredents.json')
        .then(response =>{
                          this.setState({ingredents:response.data});   
        }) 
        .catch(error=>{
            this.setState({error:true}      
            )
             });
        console.log(this.state.error)
    }
   // 'https://react-my-burger-1a8cd-default-rtdb.firebaseio.com/order/-MXVYOxlmL2kU4ZluCBC/ingredents.json')
        
    
    updatePurchaseState (ingredents) {
        
        const sum = Object.keys(ingredents)
        .map(igKey =>{
            return ingredents[igKey];
        })
        .reduce((sum,el) =>{
           return sum + el;
        },0);
        this.setState({purchasable: sum > 0});
    }

    addIngrdentHandler = (type) =>{
     const oldCount =this.state.ingredents[type];
     const updatedCount = oldCount + 1;
     const updatedIngredents = {
         ...this.state.ingredents 
     };
     updatedIngredents[type] = updatedCount;
     const priceAddition = INGREDENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
     const newPrice = oldPrice + priceAddition;
     this.setState({totalPrice:newPrice, ingredents: updatedIngredents});
     this.updatePurchaseState(updatedIngredents);
    }
    removeIngedentHandler =(type) =>{
        const oldCount =this.state.ingredents[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredents = {
            ...this.state.ingredents 
        };
        updatedIngredents[type] = updatedCount;
        const priceDeduction = INGREDENT_PRICES[type];
       const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice, ingredents: updatedIngredents});
        this.updatePurchaseState(updatedIngredents);
    }
    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }
    purchaseCancelHandler= () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler =()=>{
     //   this.setState({loading:true , purchasing: false});
        //alert('You Continue!');
       // const orders = {
         //   ingredents: this.state.ingredents,
           // price: this.state.totalPrice,
            //coustmer: {
              //  name:'satyam',
                //addres:{
                  //  street: 'chikitsaknagar',
                    //country:'India'

                //},
                //email: 'satayam@gmail.com'
            //},
            //dileveryMathod:'fastest'
        //}
        //axios.post('/order.json',orders)
        //.then(response =>{
          //  this.setState({loading:false , purchasing:false});
        //})
          //  .catch(error =>{
            //    this.setState({loading:false})  
    //});
    const queryParams =[];
    console.log(this.state.ingredents)
    for (let i in this.state.ingredents){
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredents[i]))
    }
    console.log(queryParams)

    queryParams.push('price=' + this.state.totalPrice);
    console.log(queryParams)

    const queryString = queryParams.join('&');
    console.log(queryString)

this.props.history.push({
    pathname:'/checkOut',
    search:'?' +  queryString
   });
}

    render() {
        const disabledInfo = {
            ...this.state.ingredents
        }
        for(let Key in disabledInfo){
               disabledInfo[Key] = disabledInfo[Key] <=0
        }
        let orderSummary = null;
        let burger =this.state.error ? <p>Ingredent cant loaded</p>:<Spinner/> 
        console.log(this.state.error);
        if(this.state.ingredents){
            burger =(
                <Auxiliary>
                    <Burger ingredents = {this.state.ingredents}/>;
                    
        <BuildControls
        ingredentAdded ={this.addIngrdentHandler}
        ingredentRemoved= {this.removeIngedentHandler}
        disabled = {disabledInfo}
        purchasable = {this.state.purchasable}
        ordered = {this.purchaseHandler}
        price ={this.state.totalPrice}/>
                </Auxiliary>);
                orderSummary = <OrderSummary ingredents = {this.state.ingredents} 
                price ={this.state.totalPrice}
                 purchaseCanclled ={this.purchaseCancelHandler} 
                purchaseContinued ={this.purchaseContinueHandler}/>;
        }
        if(this.state.loading){
            orderSummary =<Spinner/>;
            console.log(this.state.loading);

           }
           console.log(this.state.loading);
           console.log(orderSummary);
        
        return(
<Auxiliary>
    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
         
      {orderSummary}
    </Modal>
    {burger}
</Auxiliary>
 
        )
        
    }
    
}
    export default withErrorHandler (BurgerBuilder,axios);
