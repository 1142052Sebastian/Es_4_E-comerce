let products=[];
let categories=[];
let domProduct;
let username;
let api_url='https://dummyjson.com/products';

(()=>{
    qs();
    collect_products();
})();

var qsParm = new Array();
function qs() {
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    for (var i=0; i < parms.length; i++) {
        var pos = parms[i].indexOf('=');
        if (pos > 0) {
            var key = parms[i].substring(0, pos);
            var val = parms[i].substring(pos + 1);
            username=val;
        }
    }
}

async function collect_products() {
    const res = await fetch(api_url);
    const obj = await res.json();
    products = obj.products;
    for(var i=0; i<products.length; i++){
        domProduct=

        '<div id="product-'+i+'" class="container-singleProduct" data-value="'+products[i].category+'">'+
        '<img src="'+products[i].images[0]+'" class="product-img">'+
        '</div>'+
        '<p class="product-title">'+products[i].title+'</p>'+
        '<p class="product-color">'+products[i].title+'</p>'+
        '<p class="product-price">'+products[i].price+'</p>'+
        '</div>';
        $('#grid-products-1').append(domProduct);
    }
    products.forEach(element => {
        categories.push(element.category);
        categories=[...new Set(categories)];
    });
    categories.forEach(element =>{
        $('#header-categories').append('<option value='+element+'>'+element+'</option>');
        $('#slider-categories').append('<option value='+element+'>'+element+'</option>');
    });
    products.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    for(var i=0; i<9; i++){
        domProduct=
        '<div id="product-'+i+'" class="container-singleProduct">'+
        '<img src="'+products[i].images[0]+'" class="product-img">'+
        '<p class="product-title">'+products[i].title+'</p>'+
        '<p class="product-color">'+products[i].title+'</p>'+
        '<p class="product-price">'+products[i].price+'</p>'+
        '</div>';
        $('#grid-products-2').append(domProduct);
    }
}
// $('#header-categories').change(function(){
//     if($('#header-categories').value()!='All categories'){
//         $('#grid-products-1')
//         .children()
//         .filter(function(){
//             return $(this).data('value') === $('header-categories');
//         })
//         .hide();
//     }
// })

