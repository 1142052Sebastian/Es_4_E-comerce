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
        '<div id="product-'+i+'" class="container-singleProduct" data-category="'+products[i].category+'">'+'<div id="container-product-img">'+
        '<img src="'+products[i].images[0]+'" class="product-img">'+
        '</div>'+
        '<p class="product-title">'+products[i].title+'</p>'+
        '<p class="product-color">'+products[i].title+'</p>'+
        '<p class="product-price">'+products[i].price+'</p>'+
        '<div class="container-product-action">'+
        '<button id="product-acquista" value="'+i+'" class="product-action-button">Compra</button>'+
        '<span class="vertical-line"></span>'+
        '<button id="product-valuta" value="'+i+'"class="product-action-button">Valuta</button>'+
        '<span class="vertical-line"></span>'+
        '<button id="product-info" value="'+i+'"class="product-action-button">Info</button>'+
        '</div>'+
        '</div>'

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
        '<div id="product-'+i+'" class="container-singleProduct" data-category="'+products[i].category+'">'+'<div id="container-product-img">'+
        '<img src="'+products[i].images[0]+'" class="product-img">'+
        '</div>'+
        '<p class="product-title">'+products[i].title+'</p>'+
        '<p class="product-color">'+products[i].title+'</p>'+
        '<p class="product-price">'+products[i].price+'</p>'+
        '<div class="container-product-action">'+
        '<button id="product-acquista" value="'+i+'" class="product-action-button">Compra</button>'+
        '<span class="vertical-line"></span>'+
        '<button id="product-valuta" value="'+i+'"class="product-action-button">Valuta</button>'+
        '<span class="vertical-line"></span>'+
        '<button id="product-info" value="'+i+'"class="product-action-button">Info</button>'+
        '</div>'+
        '</div>'
        $('#grid-products-2').append(domProduct);
    }
}
$('#header-categories').change(function(){
    $('#grid-products-1').children().show();
    if($('#header-categories').val()!='tech'){
        $('#grid-products-1')
        .children()
        .filter(function(){
            return $(this).data('category')!=$('#header-categories').val();
        })
        .hide();
    }
    else{
        $('#grid-products-1').children().show();
    }
});

$('#header-inputbox').on("input",function(){
    $('#grid-products-1>div:visible')
    .filter(function(){
        return $('#header-inputbox').val().trim().toLowerCase()!=
        $('.product-title', this).text().slice(0,$('#header-inputbox').val().trim().length).toLowerCase();
    })
    .hide();
    if($('#header-categories').val()!='tech'){
        $('#grid-products-1>div')
        .not(":visible")
        .filter(function(){
            return $(this).data('category')==$('#header-categories').val();
        })
        .filter(function(){
            return $('#header-inputbox').val().trim().toLowerCase()==
            $('.product-title', this).text().slice(0,$('#header-inputbox').val().trim().length).toLowerCase();
        })
        .show();
    }
    else{
        $('#grid-products-1>div')
        .not(":visible")
        .filter(function(){
            return $('#header-inputbox').val().trim().toLowerCase()==
            $('.product-title', this).text().slice(0,$('#header-inputbox').val().trim().length).toLowerCase();
        })
        .show();
    }
})

function ChisuraPopup(){
    $('#container-top-adv').hide();
    console.log("Ciao")
};

