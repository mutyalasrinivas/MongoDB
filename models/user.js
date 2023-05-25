const mongodb = require('mongodb');
const getDb=  require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;
class User {
    constructor(name,email,cart){
       this.name=name;
       this.email=email;
       this.cart=cart; 
    }
  save(){
    const db= getDb();
     return db.collection('users').insertOne(this)
  }

  addToCart(product){
    const updatedCart = {items: [{productId: new ObjectId(product._id), quantity:1}]};
    const db= getDb();
    return db.collection('users')
     .updateOne({_id : new ObjectId(this._id)},{$set: {cart : updatedCart}});
  }

  static findById(userId){
    const db= getDb();
    return db.collection('users').findOne({_id: new ObjectId(userId)})
    .then(user=>{
      console.log(user);
    })
    .catch(err=>{
      console.log(err);
    });
  }

}



 

module.exports=User;





