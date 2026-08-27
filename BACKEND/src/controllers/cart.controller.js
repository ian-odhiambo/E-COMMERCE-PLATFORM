export const addToCart = async (req, res) => {
    try{
        const {productId} = req.body;
        const user = req.user;

        const extistingItem = user.cartItems.find(item => item.id === productId);
        if(existingItem) {
            existing.quantity += 1;
        }else{
            user.cartItems.push(productId)
        }
    }catch(error){

    }
}