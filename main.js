let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let create=document.getElementById('create')

let mood='create';
let temp;

let dataPro=[]
if(localStorage.pro != null){
    dataPro = JSON.parse(localStorage.getItem("pro"))
}
else{
    dataPro = []
}
//********************************************** */


//get total
function getTotal(){
    if(price.value !=''){
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML=result
        total.style.background="green"
    }
    else{
        total.innerHTML=""
        total.style.background="red"
    } 


    }

//read product
    function readPro(){
        getTotal()
        document.getElementById('tbody').innerHTML=''
        for(let i=0;i<dataPro.length;i++){
            document.getElementById('tbody').innerHTML+=`
              <tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updatePro(${i})">update</button></td>
                            <td><button onclick="deletePro(${i})">delete</button></td>
                        </tr>

            `
        }

         if (dataPro.length>0) {
            document.getElementById('delete-all').innerHTML=`
            <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
            `
            
        }
        else{
           document.getElementById('delete-all').innerHTML='' 
        }


    }
    readPro()


    //create new product
    function createPro(){
        let objPro={
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase(),
        }
    if(title.value!='' && price.value!='' &&category.value!='' && count.value<100){
         if(mood=="create"){
        if(count.value>1){
         for(let i=0; i<count.value; i++){
             dataPro.push(objPro); 
         }
        }
        else{
            dataPro.push(objPro); 
        }
     }
     else{
     dataPro[temp]=objPro;
     count.style.display='block'
     create.innerHTML='Create'
     mood='create'
     
     }
      
     clearInputs()
    }
      
        storage()
        readPro()
     
    }


    // local storage
    function storage(){
        localStorage.setItem("pro",JSON.stringify(dataPro))
    }

     //clear inputs
     function clearInputs(){
        title.value=''
        price.value=''
        taxes.value=''
        ads.value=''
        discount.value=''
        total.innerHTML=''
        count.value=''
        category.value=''
     }

    // delete product
    function deletePro(index){
        dataPro.splice(index,1);
        storage();
        readPro()



    }


    // delete all product
    function deleteAll(){
        dataPro.splice(0)
        storage();
        readPro()

    }

    // update
    function updatePro(i){
     title.value=dataPro[i].title
     price.value=dataPro[i].price
     taxes.value=dataPro[i].taxes
     ads.value=dataPro[i].ads
     discount.value=dataPro[i].discount
     getTotal()
     category.value=dataPro[i].category
     count.style.display='none'
     create.innerHTML='Update'
     mood='update'
     temp=i;
     scroll({
        top:0,
        behavior:"smooth"
     })
     

    }

let searchMoodd="search by title";
    // search mood
    function searchMood(id){
        let search= document.getElementById('search');
        if(id=="search-by-title"){
            searchMoodd="search by title"
        }
        else{
            searchMoodd="search by category"
        }
       search.placeholder=searchMoodd;
       search.focus();
        search.value = '';
        readPro();

      
    }

    function searchPro(value){
         document.getElementById('tbody').innerHTML = ''
        for (let i = 0; i <dataPro.length; i++) {
            if(searchMoodd=="search by title"){
                if(dataPro[i].title.includes(value.toLowerCase())){
                     document.getElementById('tbody').innerHTML+=`
                       <tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updatePro(${i})">update</button></td>
                            <td><button onclick="deletePro(${i})">delete</button></td>
                        </tr>

            `
                  }


                }
            else{
                 if(dataPro[i].category.includes(value.toLowerCase())){
                     document.getElementById('tbody').innerHTML+=`
                       <tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updatePro(${i})">update</button></td>
                            <td><button onclick="deletePro(${i})">delete</button></td>
                        </tr>

            `
                  }


            }
            
        }

    }






