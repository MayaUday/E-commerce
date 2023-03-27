function saveOnDatabase(event){
    event.preventDefault();
    const sPrice = parseFloat(event.target.price.value);
    const pName = event.target.product_name.value;

    const Productobj = {
      sPrice :  sPrice,
      pName : pName
    };
    
    axios.post("https://crudcrud.com/api/3a744bb0cd754d77bf439f7f7d4b3e2d/productsData" ,Productobj)
     .then( (response) => {
        saveProductOnScreen(response.data);
    
     })
     .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong1<h4>";
        //console.log(obj);
     })
    updateTotal(Productobj.sPrice);
     
}

function updateTotal(price) {
    const total = document.querySelector('.total');
    let currentTotal = parseFloat(total.innerHTML);
    if(isNaN(currentTotal)) {
      currentTotal = 0;
    }
    total.innerHTML = currentTotal + price;
  }


function saveProductOnScreen(Productobj){
    const parentEle = document.getElementById('listOfItems');
    const childEle = document.createElement('li');
    childEle.textContent = Productobj.sPrice + ' - ' + Productobj.pName ;

    const deleteButton = document.createElement('input');
    deleteButton.type = "button";
    deleteButton.value = "Delete Product";
    deleteButton.onclick = () => {
     axios.delete("https://crudcrud.com/api/3a744bb0cd754d77bf439f7f7d4b3e2d/productsData/" + Productobj._id)
    .then((response) => {
        parentEle.removeChild(childEle);
    })
    .catch((err) => {
        console.log(err);
    });
     //  localStorage.removeItem(Productobj.pName);
       parentEle.removeChild(childEle);
    }

    childEle.appendChild(deleteButton);
    parentEle.appendChild(childEle);

}


window.addEventListener("DOMContentLoaded" , () => {
    axios.get("https://crudcrud.com/api/3a744bb0cd754d77bf439f7f7d4b3e2d/productsData")
    .then( (response) => {

     for(var i=0;i<response.data.length ;i++){
       saveProductOnScreen(response.data[i]);
     }
    
    })
    .catch( (err) => {
     document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong2<h4>";
    })
})

