let products=[];
let domProduct;
let api_url='https://dummyjson.com/products';

(()=>{
    collect_products();
})();

async function collect_products() {
    const res = await fetch(api_url);
    const obj = await res.json();
    products = obj.products;
    console.log(products);
    for(var i=0; i<products.length; i++){
        domProduct=
        '<div id="product-'+i+'" class="container-singleProduct">'+
        '<img src="'+products[i].images[0]+'" class="product-img">'+
        '<p class="product-title">'+products[i].title+'</p>'+
        '<p class="product-color">'+products[i].title+'</p>'+
        '<p class="product-price">'+products[i].price+'</p>'+
        '</div>';
        $('#grid-products').append(domProduct);
        console.log(domProduct);
    }
}

/* DOM template datatable 
    <table id="product-table" class="display" style="width:100%">
        <thead>
            <tr>
                <th>Icona</th>
                <th>Titolo</th>
                <th>Descrizione</th>
                <th>Prezzo</th>
                <th>Sconto</th>
            </tr>
        </thead>
    </table>
*/

