import React,{createContext,useContext,useState,useEffect} from "react";
import { toast } from "react-hot-toast";

const Context=createContext();

export const StateContext=({children})=>{
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, settotalPrice] = useState(0)
    const [totalQuantities, settotalQuantities] = useState(0)
    const [qty, setqty] = useState(1)

    let foundProduct;
    let index;

    const incQty=()=>{
        setqty((prev)=>prev+1)
    }
    const decQty=()=>{
        setqty((prev)=>{
            if(prev-1<1) return 1;
            return prev-1;
        })
    }
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        settotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        if(checkProductInCart) {
          const updatedCartItems = cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id) return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
            }
          })
    
          setCartItems(updatedCartItems);
        } else {
          product.quantity = quantity;
          
          setCartItems([...cartItems, { ...product }]);
        }
    
        toast.success(`${qty} ${product.name} added to the cart.`);
    } 
    const toggleCartItemQuantity=(id,value)=>{
        foundProduct=cartItems.find((item)=>item._id===id)
        index=cartItems.findIndex((item)=>item._id===id)
        const newCartItems=cartItems.filter((item)=>item._id!==id)
        if(value==='inc'){
            setCartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity+1}])
            settotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.price)
            settotalQuantities((prevTotalQuantities)=>prevTotalQuantities+1)
        }else if(value==='dec'){
            if(foundProduct.quantity>1){
                setCartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity-1}])
                settotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price)
                settotalQuantities((prevTotalQuantities)=>prevTotalQuantities-1)
                }
        }
    }
    const onRemove=(product)=>{
        foundProduct=cartItems.find((item)=>item._id===product._id)
        const newCartItems=cartItems.filter((item)=>item._id!==product._id)
        setCartItems(newCartItems)
        settotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.quantity*foundProduct.price)
        settotalQuantities((prevTotalQuantities)=>prevTotalQuantities-foundProduct.quantity)
    }
    return(
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext=()=>useContext(Context)