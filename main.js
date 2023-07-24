let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let count = document.getElementById('count');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


let mood = 'create';
let tem;



// clean data from the user

// get the total price
function getTotal() {
    if(price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result ;
        total.style.backgroundColor = "green";
    }else {
        total.innerHTML = '' ;
        total.style.backgroundColor = "rgb(233, 70, 70)";
    }

}


// create product
let arrayPro;
if (localStorage.product != null) {
    arrayPro = JSON.parse(localStorage.product);
} else {
    arrayPro = [];
}

// save data to the local storage
submit.onclick = function () {
    let newPro = {
        title : title.value.toLowerCase() ,
        price : price.value ,
        taxes : taxes.value ,
        ads : ads.value ,
        discount : discount.value ,
        total : total.innerHTML ,
        count : count.value ,
        category : category.value.toLowerCase(),
    }

    if(title.value !='' && price.value!='' && category.value!='' && newPro.count < 100) {
        if(mood === 'create') {
            if(newPro.count > 1) {
                for(let i=0; i<newPro.count; i++) {
                    arrayPro.push(newPro);
                }
            }else {
                arrayPro.push(newPro);
            }
        }else {
            arrayPro[tem] = newPro ;
            submit.innerHTML = "create";
            count.style.display = "block";
        }
        clearData();
    } 
    
    
    localStorage.setItem('product', JSON.stringify(arrayPro));

    
    showData();
}


// delet the info after creating the ele
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}



// read
function showData() {
    getTotal()
    let tabel = '' ;
    for(let i = 0; i < arrayPro.length; i++) {
        tabel += `
        <tr>
            <td>${i+1}</td>
            <td>${arrayPro[i].title}</td>
            <td>${arrayPro[i].price}</td>
            <td>${arrayPro[i].taxes}</td>
            <td>${arrayPro[i].ads}</td>
            <td>${arrayPro[i].discount}</td>
            <td>${arrayPro[i].total}</td>
            <td>${arrayPro[i].category}</td>
            <td><button onclick="updataData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }

    document.getElementById('tbody').innerHTML = tabel;

    let btnDeleteAll = document.getElementById('deleteAll');
    if(arrayPro.length > 1) {
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All (${arrayPro.length})</button>
        `
    }else{
        btnDeleteAll.innerHTML = "";
    }
}
showData();



// delete
function deleteData(i) {
    arrayPro.splice(i,1);
    localStorage.product = JSON.stringify(arrayPro);
    showData()
}

function deleteAll() {
    localStorage.clear();
    arrayPro.splice(0);
    showData()
}


// updata function
function updataData(i) {
    title.value = arrayPro[i].title;
    price.value = arrayPro[i].price;
    taxes.value = arrayPro[i].taxes;
    ads.value = arrayPro[i].ads;
    discount.value = arrayPro[i].discount;
    getTotal()
    count.style.display = "none";
    category.value = arrayPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tem = i;
    scroll({
        top: 0 ,
        behavior: "smooth"
    })
}


// search

let searchMood = "title";

function getSearchMood(id) {
    let search = document.getElementById('search');
    if(id == "seachTitle") {
        searchMood = "title";
    }else {
        searchMood = "category";     
    }
    search.placeholder = "search by "+searchMood;
    search.focus()
    search.value = '';
    showData()
}

// make the search function itself
function searchData(value) {
    let tabel = '';
    for(i=0; i<arrayPro.length; i++) {
        if(searchMood == 'title') {
                if(arrayPro[i].title.includes(value.toLowerCase())) {
                    tabel += `
                        <tr>
                            <td>${i}</td>
                            <td>${arrayPro[i].title}</td>
                            <td>${arrayPro[i].price}</td>
                            <td>${arrayPro[i].taxes}</td>
                            <td>${arrayPro[i].ads}</td>
                            <td>${arrayPro[i].discount}</td>
                            <td>${arrayPro[i].total}</td>
                            <td>${arrayPro[i].category}</td>
                            <td><button onclick="updataData(${i})" id="update">Update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                        </tr>
                    `
                }         
            
        }else{
            if(arrayPro[i].category.includes(value.toLowerCase())) {
                tabel += `
                    <tr>
                        <td>${i}</td>
                        <td>${arrayPro[i].title}</td>
                        <td>${arrayPro[i].price}</td>
                        <td>${arrayPro[i].taxes}</td>
                        <td>${arrayPro[i].ads}</td>
                        <td>${arrayPro[i].discount}</td>
                        <td>${arrayPro[i].total}</td>
                        <td>${arrayPro[i].category}</td>
                        <td><button onclick="updataData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                `
            }       
        }
    }
    document.getElementById('tbody').innerHTML = tabel;
}