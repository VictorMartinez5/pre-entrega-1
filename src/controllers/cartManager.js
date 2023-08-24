import fs from "fs"
import { nanoid } from "nanoid"


  export default class CartManager{
      constructor(){
          this.path= "./src/models/carts.json"
        
      }
  
    getCarts=async()=>{
      try{
        if(fs.existsSync(this.path)){
          const cartlist= await fs.promises.readFile(this.path,"utf-8")
          const cartlistparse=JSON.parse(cartlist)
          return cartlistparse
        }
        else{
          return  []
          
        }
      }
      catch(error)
      {
        throw new Error(error)
      }
    }


    getCartbyId=async(id)=>{
      const{cid}=id
      const allcarts=await this.getCarts()
     const found=allcarts.find(element=>element.id=== cid )
     if(found){
      return found
     }
     else{
    console.error("This cart was not found")
     }
  }



    // //GENERATE ID 
    // generateCartId=async()=>{
    //    if(fs.existsSync(this.path)){
    //     const listadecarts=await this.getCarts()
    //     const counter=listadecarts.length
    //     if(counter==0){
    //         return 1
    //     }
    //     else{
    //         return (listadecarts[counter-1].id)+1
    //     }
    //    }
    // }
    
    //CREATE
    addCart=async()=>{
      const listadecarts=await this.getCarts()
            const id= nanoid(3)
            const cartnew={
                id,
                products:[]
            }
            listadecarts.push(cartnew)
            await fs.promises.writeFile(this.path,JSON.stringify(listadecarts,null,2))
        }
      
    


     //UPDATE
     addProductToCart = async (cid, pid) => {
      const listaCarts = await this.getCarts();
    
      const cart = listaCarts.find(e => e.id === cid);
    
      if (!cart) {
        console.error("Cart not found");
        return; // Exit the function if the cart is not found
      }
    
      const productoIndex = cart.products.findIndex(element => element.pid === pid)
    
      if (productoIndex !== -1) {
        cart.products[productoIndex].quantity++;
      }
      else {
        cart.products.push({
          pid,
          quantity: 1
        });
      }
    
      await fs.promises.writeFile(this.path, JSON.stringify(listaCarts, null, 2))
    }
    
  }


