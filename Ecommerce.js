const total = document.getElementById('total');

function saveOnDatabase(event){
    event.preventDefault();
    const sPrice = parseFloat(event.target.price.value);
    const pName = event.target.product_name.value;

    const Productobj = {
      sPrice :  sPrice,
      pName : pName
    };
    
    axios.post("https://crudcrud.com/api/18f97a9873c54c90a59733bc93191bbc/productsData" ,Productobj)
     .then( (response) => {
        saveProductOnScreen(response.data);
     })
     .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong1<h4>";
        //console.log(obj);
     })
     addTotal(Productobj.sPrice);
     
}

function addTotal(price) {
    let currentTotal = parseFloat(total.innerHTML);
    if(isNaN(currentTotal)) {
      currentTotal = 0;
    }
    total.innerHTML = currentTotal + price;
  }

  function deleteTotal(price) {
    let currentTotal = parseFloat(total.innerHTML);
    if(isNaN(currentTotal)) {
      currentTotal = 0;
    }
    total.innerHTML = currentTotal - price;
  }


function saveProductOnScreen(Productobj){
    const parentEle = document.getElementById('listOfItems');
    const childEle = document.createElement('li');
    childEle.textContent = Productobj.sPrice + ' - ' + Productobj.pName ;

    const deleteButton = document.createElement('input');
    deleteButton.type = "button";
    deleteButton.value = "Delete Product";
     let sum=0;
    deleteButton.onclick = () => {
     axios.delete("https://crudcrud.com/api/18f97a9873c54c90a59733bc93191bbc/productsData/" + Productobj._id)
    .then((response) => {
      parentEle.removeChild(childEle);   
      deleteTotal(Productobj.sPrice);
    })
    .catch((err) => {
        console.log(err);
    });
     //  localStorage.removeItem(Productobj.pName);
       //parentEle.removeChild(childEle);
    }
    childEle.appendChild(deleteButton);
    parentEle.appendChild(childEle);

}


  window.addEventListener("DOMContentLoaded" , () => {
      axios.get("https://crudcrud.com/api/18f97a9873c54c90a59733bc93191bbc/productsData")
      .then( (response) => {
       for(let i=0;i<response.data.length ;i++){
          saveProductOnScreen(response.data[i]);  
          addTotal(response.data[i].sPrice);           
       }    
      })
      .catch( (err) => {
       document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong2<h4>";
      })
  })

