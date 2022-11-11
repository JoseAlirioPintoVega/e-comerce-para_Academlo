window.addEventListener('load', function () {
  load()
})

const iconMenu = document.querySelector('.menu-hamburger');
const navMenu = document.querySelector('.nav__menu');
const xMark = document.querySelector('.nav__close');

const menuUno = document.querySelector('.menu-uno');
const menuDos = document.querySelector('.menu-dos');
/* 
const menu =document.querySelector('.menu')
const childsMenu = menu.children; */


function showMenu(){
  navMenu.classList.toggle("menu__show");
}
iconMenu.addEventListener('click',showMenu);
xMark.addEventListener('click',showMenu);
menuUno.addEventListener('click',showMenu);
menuDos.addEventListener('click',showMenu);


/* --------------scroll------------------ */ 
const header = document.querySelector('.header');    
if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY >= 50) {
        header.classList.add('header__scroll')
      } else {
        header.classList.remove('header__scroll')
      }
    })
  }
/* -------------------------------------- */ 
const iconCart = document.querySelector('.icon-cart');
const boxCart = document.querySelector('.cart');
const cartClose = document.querySelector('.cart__close');

function showCart(){
    boxCart.classList.toggle("cart__show");
}
iconCart.addEventListener('click',showCart);
cartClose.addEventListener('click', showCart);

 
/*--------objetos inventario ------- */
let inventario = [
  {
    id: 01,
    name: "Hoodies",
    stock: 5,
    price: 14.00,
    imagen: "./src/img/featured1.png"
  } ,
  {
    id: 02,
    name: "Shirt",
    stock: 6,
    price: 24.00,
    imagen: "./src/img/featured2.png",
  }, 
  {
    id: 03,
    name: "Sweatshirts",
    stock: 7,
    price: 24.00,
    imagen: "./src/img/featured3.png"
  } 
]

/* ---------------pintando el inventario---------------------*/

const boxStock = document.querySelector('.box-stock');

let html = ``;

function printStock(){
    inventario.forEach(({id,name,stock,price,imagen})=>{
      html += `
        <div class="card-product">
        <div class="box-img">
            <img src=${imagen} alt="${name}">
        </div>
        <div class="product-data">
            <p class="data-price">$ ${price} | <span>Stock: ${stock}</span></p>
            <p class="name-product">${name}</p>
            <button class="add" id="${id}">+</button>
        </div>   
        </div>
      `
  })
}
 
printStock();
boxStock.innerHTML = html;


/*----------------pintando el inventario en el carro-------------*/


let objetCartShop = {}
const contentProductCartShop = document.querySelector('.content-product-cart-shop')


function printCartShop(){
  let html = ``

  const arrayCartShop = Object.values(objetCartShop);

  arrayCartShop.forEach(({id,name,ammout,price,imagen,stock}) =>{
    html += `
    <div class="card-product-shop">
      <div class="box-img">
          <img src=${imagen} alt="${name}">
      </div>
      <div class="product-data">
        <p class="name-product">${name}</p>
        <p class="data-price">Stock: ${stock} |$ ${price} </p>
        <p class="data-price">Subtotal:$ ${ammout*price} </p>
          <div class="all-btn-shop">
            <div class="btn-add-rest">
              <button class="rest" id="${id}">-</button>
              <p class="unid">${ammout} unid </p>
              <button class="add" id="${id}">+</button>
            </div> 
          <button class="delete" ><i id="${id}"class="fa-solid fa-trash"></i></button>
        </div>
          
      </div>   
    </div>
    `
  });
contentProductCartShop.innerHTML = html;
  printTotal()
}




boxStock.addEventListener('click',(e)=>{

  if(e.target.classList.contains("add")){
    const idclothing = Number(e.target.id)

    const objetFind = inventario.find((objet) => objet.id === idclothing );

    if(objetCartShop[objetFind.id]){
     
      add(idclothing);
    }else{
      objetCartShop[objetFind.id] =  objetFind /*  {...objetFind}*/;
      objetCartShop[objetFind.id].ammout = 1;
    }
    printCartShop();
  }
})

function add(idclothing){
  const objetFind = inventario.find((product) => product.id === idclothing );
  console.log(objetFind.stock )
  console.log("mitad")
  console.log(objetFind)
  if(objetFind.stock === objetFind.ammout){
       return alert("no hay mas productos en el inventario")
  } 
  objetCartShop[objetFind.id].ammout++;
}




contentProductCartShop.addEventListener('click',(e)=>{

  if(e.target.classList.contains('add')){
    const idclothing = Number(e.target.id);
    
    add(idclothing);
  }
  if(e.target.classList.contains('rest')){
    const idclothing = Number(e.target.id);

    if(objetCartShop[idclothing].ammout === 1){
      const op = confirm("Seguro que quieres eleminar esta hermosa camisa")

      if(op){
        delete objetCartShop[idclothing];
      }else{
        objetCartShop[idclothing].ammout = 1; 
      }
    }else{
      objetCartShop[idclothing].ammout--
    }
  }
  if(e.target.classList.contains('fa-trash')){
    const idclothing = Number(e.target.id);
    const op = confirm("seguro que quieres eliminar?")
    if(op){delete objetCartShop[idclothing]};
  }
  printCartShop();
})


/*---------------pintar el total--------------------- */

const containerTotalCartShop = document.querySelector('.container-total-cart-shop')
const cartCount = document.getElementById('cart-count');

const cartEmpty = document.querySelector('.cart__empty')

function printTotal(){
  const arrayCartShop = Object.values(objetCartShop);
  if(!arrayCartShop.length){
    
    return containerTotalCartShop.innerHTML = `<h3> No hay nada</h3>`;

  }

   
  let total = arrayCartShop.reduce((acum, curr) => {
    acum += curr.price * curr.ammout;
  
   return acum;
  }, 0);

  let suma = arrayCartShop.reduce((acum,curr)=>{
    
    acum += curr.ammout
    return acum
  }, 0)
  /* cartEmpty.classList.contains.toggle('cart__empty_off'); */

  containerTotalCartShop.innerHTML = 
  `<div class="box-total">
    <div class="box-total-product">
      <h3> ${suma} items</h3><h3> $  ${total}.00</h3>
    </div>
    <button class="btn_buy"> Comprar</button>
    </div>
    
    `;
    cartCount.innerHTML = `${suma}`
    
  }
  
  /*---------------boton buy ------------ */

 containerTotalCartShop.addEventListener('click', (e)=>{
  if(e.target.classList.contains('btn_buy')){
    const op = confirm('deseas continuar');

    if(op){
      alert("Gracias por realizar su compra");
      /* let aux = inventario.map((product)=>{
       if(objetCartShop[idclothing].id === product.id){
          return {
            ...product,
            stock: product.stock - objetCartShop[idclothing].ammout
          }
       }
      }) */
      objetCartShop = {};
      printCartShop()
    }
  }
  printTotal();
})
  
/**------dark-mode------------- */
 const darkMode = document.querySelector('.fa-moon');
const bodyContainer = document.querySelector('body');
darkMode.addEventListener('click', ()=>{
bodyContainer.classList.toggle('dark-mode')
})
 
/*-------------load----------------- */
function load () {
  const load = document.getElementById('loader')
  if (load) {
    setTimeout(() => {
      load.style.display = 'none'
    }, 3000)
  }
}













