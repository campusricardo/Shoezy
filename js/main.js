console.log(zapatos);

const nombreZapatos = document.querySelector("#nombre");
const colorZapato = document.querySelector("#color");
const precioMinZapato = document.querySelector("#minimo");
const precioMaxZapato = document.querySelector("#maximo");
const marcaZapato = document.querySelector("#marca");
const generoZapato = document.querySelector("#genero");
let buscarShoe = document.querySelector(`#buscarShoe`);
let precioSumado = 0;

zapatos.sort((a, b) =>{
  if(a.nombre < b.nombre)
  {
    return -1;
  }
  if(a.nombre > b.nombre)
  {
    return 1;
  }
})

zapatos.forEach((opcionZapatos) => {
  const opcion = document.createElement("option");
  opcion.value = opcionZapatos.nombre;
  opcion.textContent = opcionZapatos.nombre;
  document.querySelector("#nombre").appendChild(opcion);
});


const parametros = {
  nombre: "",
  color: "",
  precio: "",
  minPrecio: "",
  maxPrecio: "",
  marca: "",
  genero: "",
  id: ""
};

/* 3. event listener */

document.addEventListener("DOMContentLoaded", () => {
  showZapatos(zapatos);
  selectShoe()
  console.log(parametros);
  calcular();
});


nombreZapatos.addEventListener("input", (e) => {
  parametros.nombre = e.target.value;
  filtrarZapato();
});

colorZapato.addEventListener("input", (e) => {
  parametros.color = e.target.value;
  filtrarZapato();
});

precioMinZapato.addEventListener("input", (e) => {
  parametros.minPrecio = Number(e.target.value);
  filtrarZapato();
});

precioMaxZapato.addEventListener("input", (e) => {
  parametros.maxPrecio = Number(e.target.value);
  filtrarZapato();
});

marcaZapato.addEventListener("input", (e) => {
  parametros.marca = e.target.value;
  filtrarZapato();
});

generoZapato.addEventListener("input", (e) => {
  parametros.genero = e.target.value;
  filtrarZapato();
});

buscarShoe.addEventListener(`input`, (e) => {
  parametros.buscarShoe = e.target.value;
  filtrarZapato();
})

let arrayPrice = [];
let varMax = 0;
let varMin = Infinity;
function calcular(){
  for(let k = 0;k< arrayPrice.length; k++)
{
  if ( varMax < arrayPrice[k])
  {
    varMax = arrayPrice[k];
  }
}
  for(let i = 0; i< arrayPrice.length; i++)
  {
    if( varMin > arrayPrice[i])
    {
      varMin = arrayPrice[i];
    }
  }
precioMinZapato.setAttribute(`min`, varMin);
precioMinZapato.setAttribute(`max`, varMax);
precioMaxZapato.setAttribute(`min`, varMin);
precioMaxZapato.setAttribute(`max`, varMax);



}



function showZapatos(zapatos) {
  const containerShelves = document.querySelector("#shelves");


  limpiar()


  zapatos.forEach((zapato) => {

    const { imagen, nombre, precio, color, marca, genero, id } = zapato;
    const zapatosHTML = document.createElement("p");
    zapatosHTML.classList.add("pContainerDiv");
    arrayPrice.push(precio);
    zapatosHTML.innerHTML = `
        
        <div class="card">
            <img src="img/${imagen}" class="card-img-top" width="318px" height="318px" alt="..." id="imgCard" />
            <div class="card-body">
              <h5 class="card-title">${nombre}</h5>
              <p class="card-text">
              Precio: ${precio}</p>
              <input type="text" value="" id="tallaCol" placeholder="Dime tu talla de zapato">
            </div>
            <ul class="list-group list-group-flush d-flex flex-row justify-content-between">
            <a href="#"  class="btnDetails col-10"  data-bs-toggle="modal" data-bs-target="#exampleModal" imagen ="${imagen}" nombre="${nombre}" marca="${marca}" precio="${precio}" color="${color}" genero="${genero}"> Detalles</a>

            <img class="imgCart boton" src="../img/carrito-sin.png" width="40px" imagen="${imagen}" nombre="${nombre}" precio="${precio}" id="${id}" heigth="30px">
            </ul>
          </div>
        
        `;
    containerShelves.appendChild(zapatosHTML);
  });
}

/* 8. definicion de funcion filter de alto nivel */

function filtrarZapato() {
  const resultado = zapatos
    .filter(filtrarNombre)
    .filter(filtrarColor)
    .filter(filtrarMin)
    .filter(filtrarMax)
    .filter(filtrarMarca)
    .filter(filtrarGenero)
    .filter(filtrarBuscarShoe)
 console.log(resultado);
  if(resultado.length){


    showZapatos(resultado);

  }
  else
  {
    noResultado();

  }

}

function noResultado()
{
  limpiar();
  const noResult = document.createElement (`p`);
  noResult.classList.add(`alerta`);
  noResult.appendChild(document.createTextNode(`No se encontraron Zapatos con esas Caracteristicas`));
  document.querySelector(`#shelves`).appendChild(noResult);
}



function filtrarNombre(zapato) {
  if (parametros.nombre) {
    return zapato.nombre === parametros.nombre;
  }
  return zapato;
}

function filtrarColor(zapato) {
  if (parametros.color) {
    return zapato.color === parametros.color;
  }
  return zapato;
}

function filtrarMin(zapato) {
  if (parametros.minPrecio) {
    return zapato.precio >= parametros.minPrecio;
  }
  return zapato;
}

function filtrarMax(zapato) {
  if (parametros.maxPrecio) {
    return zapato.precio <= parametros.maxPrecio;
  }
  return zapato;
}

function filtrarMarca(zapato) {
  if (parametros.marca) {
    return zapato.marca === parametros.marca;
  }
  return zapato;
}

function filtrarGenero(zapato) {
  if (parametros.genero) {
    return zapato.genero === parametros.genero;
  }
  return genero;
}
function filtrarBuscarShoe(zapato){
  if(parametros.buscarShoe)
  {
    return zapato.nombre.toLocaleLowerCase().startsWith(parametros.buscarShoe.toLocaleLowerCase());

  }
  return zapato;
}


function limpiar() {
  let m = document.querySelectorAll("p");
  for (let n = 0; n < m.length; n++) {
    m[n].remove();
  }
}
const tbody = document.querySelector(`tbody`);
const rowModal = document.createElement(`tr`);

function selectShoe()
{
  const camperDetails =  document.querySelector(`#shelves`);
  camperDetails.addEventListener(`click`, loadDetailShoe);
};


function loadDetailShoe(e)
{
  
  const imagen = e.target.getAttribute(`imagen`);
  const nombre = e.target.getAttribute(`nombre`);
  const marca = e.target.getAttribute(`marca`);
  const precio = e.target.getAttribute(`precio`);
  const  color = e.target.getAttribute(`color`);
  const genero = e.target.getAttribute(`genero`);
  precioFinal = Number(precio) + 10000;
  rowModal.innerHTML = `
  <td>
  <img src ="img/${imagen}" width="160px" >
  </td>

  <td>
    ${nombre}
  </td>
  <td>
    ${marca}
  </td>
  <td>
    ${precio > 500000 ? 
    `Envio Gratis <br> Precio a pagar $${precio}` : `Costo Total mas Envio = $${precioFinal}`} 
  </td>
  <td>
    ${color}
  </td>
  <td>
  ${genero}
  </td>
  `;
  tbody.appendChild(rowModal);
};




const shoes = document.querySelector(`#shelves`);
let arrayShoes = [];
const tbodie = document.querySelector('#tbodie');
// const deleteAllShoes = document.querySelector(`#deleteAllShoes`);

// listeners
const ulSearch = document.querySelector(`.xds`);

shoes.addEventListener(`click`,selectShoes);

ulSearch.addEventListener(`click`, deleteAShoe);

document.addEventListener(`DOMContentLoaded`, ()=> {
  arrayShoes =  JSON.parse(localStorage.getItem(`shoeBought`))|| [];
  inyectingShoesHTML();

})

// deleteAllShoes.addEventListener(`click`, deleteAllShoe);
let cuantityElements = document.querySelector(".badge");

function selectShoes(e)
{
  e.preventDefault();
  console.log(e.target);
  if(e.target.classList.contains(`boton`)){
    const selectShoe = e.target.parentElement.parentElement;
    
    console.log(selectShoe);
    detail(selectShoe);
  }   
  else {
    console.log(selectShoe);

    console.log(`ño`);
  }
};


function detail(selectShoe)
{
  const shoeDetails = {
    imagen: selectShoe.querySelector(`img`).src,
    nombre: selectShoe.querySelector(`h5`).textContent,
    precio: selectShoe.querySelector(`p`).textContent,
    id: selectShoe.querySelector(`.boton`).getAttribute(`id`)
  };
  console.log(shoeDetails);
  arrayShoes = [...arrayShoes, shoeDetails];
  console.log(arrayShoes);
  inyectingShoesHTML();
}

function deleteAShoe(e)
{
  e.preventDefault();
  if(e.target.classList.contains(`deleteShoe`))
  {
    const shoeToDelete = e.target.getAttribute(`id`);
    arrayShoes = arrayShoes.filter((xd)=> xd.id !== shoeToDelete  );
    inyectingShoesHTML();
  }
};


function inyectingShoesHTML() 
{
  cleanHTML();
  arrayShoes.forEach((shoePrice) => {
    const {nombre, precio, id} = shoePrice;
    const listCreate = document.createElement(`li`);
    listCreate.classList.add(`list-group-item`, `d-flex`, `justify-content-between`, `lh-sm`, `product`);
  
      listCreate.innerHTML =`
  
      <div>
      <h6 class="my-0"> ${nombre}</h6>
      <small class="text-muted"> ${precio}</small>
      </div>
      <a class="text-muted deleteShoe" style="text-decoration: none;"href= "#" id="${id}" >x</a>
      `
      ulSearch.appendChild(listCreate);
  });
  
  addStorage();
}


function cleanHTML()
{
  precioSumado = 0;
  arrayShoes.forEach((shoePrice) => {
    const {precio} = shoePrice;
    let price = precio.split(':');
    console.log(price);
    precioSumado += Number(price[1]);
    });
    cuantityElements.textContent =`${arrayShoes.length}`;
  ulSearch.innerHTML = `
  <li class="list-group-item d-flex justify-content-between bg-light">
  <div class="text-success">
  <h6 class="my-0">Código promocional</h6>
  <small></small>
  </div>
  <span class="text-success promotioncode"></span>
  </li>
  <li class="list-group-item d-flex justify-content-between">
  <span>Total (USD)</span>
  <strong id="value">$${precioSumado}</strong>
  </li>
  `
};

function promotion()
{
  let inputcode = document.querySelector(`.promocion`).value;
  console.log(inputcode);
  let promotioncode = document.querySelector(`.promotioncode`);
  if(inputcode === `CAMPUS2023` && arrayShoes.length)
  {
      let finalprice = document.querySelector(`#value`);
      finalprice.textContent = `${precioSumado*0.5}`
      promotioncode.textContent = `-50%`;
  }
  
}

function addStorage()
{
  localStorage.setItem(`shoeBought`, JSON.stringify(arrayShoes));
}

