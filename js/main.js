const d = document;

const $ul = d.querySelector(".list-items"),
    $cuponInput = d.getElementById("cupon"),
    $banger = d.querySelector(".banger.banger-blue"),
    $formCupon = d.querySelector(".form-cupon"),
    $formContact = d.querySelector(".form-contact"),
    $subTotal = d.querySelector('.sub-total'),
    $tax = d.querySelector('.tax'),
    $total = d.querySelector('.total'),
    span = d.querySelector('.error');
  
const $fragment = d.createDocumentFragment();

const listProducts = [
    {product: 'iPhone 12 Pro', color: 'Golden', prices: '999.00', cant: '1', img: './assets/Gold.png'},
    {product: 'Apple Watch', color: 'Blue', prices: '399.00', cant: '1', img: './assets/Blue.png'},
    {product: 'iMac', color: 'Green', prices: '1199.00', cant: '1', img: './assets/iMac=Front 1.png'},
    {product: 'iMac', color: 'Blue Ocean', prices: '1099.00', cant: '2', img: './assets/iMac=Front 1@2x.png'}
];

let totalPrices = 0, tax = 24 / 100;

const coupon = [
    {desc: 0.10, cupon: '006578442'}, 
    {desc: 0.25, cupon: '007645381'}, 
    {desc: 0.50, cupon: '745321896'}, 
    {desc: 0.75, cupon: '453728921'}
];

function getCouponDiscound(){

    $formCupon.addEventListener("submit", (e) => {

        e.preventDefault();

        let searchCupon = coupon.find((cupon) => cupon.cupon === e.target.cupon.value);

        if(!searchCupon){
            span.classList.add("active");
            span.textContent = "This coupon doesn't founded!!!";
            return;
        }

        let pricesDesc = totalPrices * searchCupon.desc, 
            subTotal = totalPrices - pricesDesc,
            totalTax = subTotal * tax;


        $subTotal.textContent = `$${parseInt(subTotal).toFixed(2)}`;
        $tax.textContent = `$${parseFloat(totalTax).toFixed(2)}`;
        $total.textContent = `$${(subTotal+totalTax).toFixed(2)}`;
    });

    $formContact.addEventListener("submit", (e) => {

        e.preventDefault();

        let name = e.target.firtsLastName, 
            email = e.target.email,
            country = e.target.country,
            postalCode = e.target.postalCode;

        if(!name.value || !email.value || !country.value || !postalCode.value){
            name.classList.add("error-input");
            email.classList.add("error-input");
            country.classList.add("error-input");
            postalCode.classList.add("error-input");
           d.querySelector(".form-error").classList.add("active");
           setTimeout(() => {
            d.querySelector(".form-error").classList.remove("active");
           }, 3000);
        }
    });
}

const deleteProduct = (btn, totalPrices) => {

    if(!Array.isArray(btn)) return console.error("El dato no es valor de tipo array");

    btn.forEach(span => {

        span.addEventListener("click", (e) => {

            e.stopPropagation();

            let id = parseInt(e.target.dataset.id), 
                product = listProducts[id],
                restProduct = 0,
                subTotalTax = 0;
 
            restProduct = parseInt(product.prices*product.cant);
            totalPrices = totalPrices - restProduct;
            subTotalTax = totalPrices * tax;
            
            d.querySelectorAll(".list-element-item")[id].classList.add("delete");
            $subTotal.textContent = `$${totalPrices.toFixed(2)}`;
            $tax.textContent = `$${subTotalTax.toFixed(2)}`;
            $total.textContent = `$${(totalPrices+subTotalTax).toFixed(2)}`;
            $banger.textContent = `${listProducts.length > 0 ? listProducts.length -= 1 : 0} Items`;
        });
    });
}

function addListOfProduct(productos){

    if(!Array.isArray(productos)) return console.error("El dato ingresado no es de tipo arreglo");

    productos.forEach((data, idx) => {

        const li = d.createElement("li");
        li.classList.add("list-element-item");
        li.innerHTML = `
            <div class="content-img">
                <img src="${data.img}" alt="Images ${idx+1}">
            </div>
            <article class="info-product">
                <section>
                    <h4 class="name-product">${data.product}</h4>
                    <p class="color-product">${data.color}</p>
                    <span class="total-product">x ${data.cant}</span>
                </section>
                <section>
                    <h4 class="price-product">$${parseInt(data.prices*data.cant).toFixed(2)}</h4>
                    <span class="close" data-id="${idx}">
                        <img src="./assets/close-icon.svg" alt="Close">
                    </span>
                </section>
            </article>
        `;
        $fragment.appendChild(li);

        totalPrices += parseInt(data.prices*data.cant);
    });

    $ul.appendChild($fragment);

    $banger.textContent = `
        ${productos.length || d.querySelectorAll('.list-items .list-element-item').length} Items
    `;

    let totalTax = totalPrices * tax;

    $subTotal.textContent = `$${totalPrices.toFixed(2)}`;
    $tax.textContent = `$${parseFloat(totalTax).toFixed(2)}`;
    $total.textContent = `$${(totalPrices+totalTax).toFixed(2)}`;

    const $btnCloses = d.querySelectorAll("span.close");
   
    deleteProduct(Array.from($btnCloses), totalPrices);
}
//Tasa es del 24%

d.addEventListener("DOMContentLoaded", () => {

    //alert("Los cargadores se venden por separado, jejejejeje");

    addListOfProduct(listProducts);
    getCouponDiscound();
});

d.addEventListener("keyup", (e) => {

    if(e.target === $cuponInput){
        
        let $input = e.target.value, 
            pattern = e.target.pattern;

        let reg = new RegExp(pattern).test($input);

        if(!reg && $input !== ""){
            span.classList.add("active");
            span.textContent = "This field only accept numbers, please use the correct format";
            e.target.classList.add("error-input");
        
        }else{
            span.classList.remove("active"); 
            e.target.classList.remove("error-input");
            span.textContent = "";
        }
    }

    if(e.target.matches(".form-contact input")){
        
        let $value = e.target.value,
            pattern = e.target.pattern;

        let reg = new RegExp(pattern).test($value);

        if(!reg && $value !== ""){
            e.target.nextElementSibling.classList.add("active");
            e.target.nextElementSibling.textContent = `The field ${e.target.name} is not a valid pattern`;
            e.target.classList.add("error-input");
        }else{
            e.target.nextElementSibling.classList.remove("active"); 
            e.target.classList.remove("error-input");
            e.target.nextElementSibling.textContent = "";
        }
    }
});

