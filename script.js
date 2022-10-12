let products=[];
let categories=[];
let domProduct;
let username;
let api_url='https://dummyjson.com/products';

(()=>{
    qs();
    collect_products();
    
    $(window).on('load', () => {
        console.log(localStorage.getItem("loggedUsername"));
        if(localStorage.getItem("loggedUserIndex") >= 0){
            $("#username").text(localStorage.getItem("loggedUsername"));
            $("#login-redirect").attr("href", "chart.html");
        }
        else
        {
            $("#username").text("Login");
            $("#login-redirect").attr("href", "login.html");

            localStorage.setItem("loggedUsername", "");
            localStorage.setItem("loggedUserIndex", -1);
        }
    });
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

var map = L.map('map', {
    zoomControl: false,
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    boxZoom: false,
    keyboard: false
}).setView([45.548739, 11.547787], 13);;

var gl = L.mapboxGL({
  attribution: "\u003ca href=\"https://carto.com/\" target=\"_blank\"\u003e\u0026copy; CARTO\u003c/a\u003e \u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
  style: 'https://api.maptiler.com/maps/voyager/style.json?key=zrkvEbFMx4ryGPzExE4m'
}).addTo(map);



var obj;

fetch('https://dummyjson.com/products/categories')
.then(res => res.json())
.then(res => addMarkers(res));

var coord = [[45.550783, 11.541953], [45.547719, 11.555815], [45.538702, 11.524057], [45.559499, 11.542597], [45.550003, 11.564226], 
            [45.535215, 11.560450], [45.556854, 11.548605], [45.533293, 11.572208], [45.530888, 11.518650], [45.572960, 11.538219],
            [45.550125, 11.549549], [45.546759, 11.519337], [45.525356, 11.558475], [45.553010, 11.554356], [45.544354, 11.574612],
            [45.559501, 11.541309], [45.559020, 11.511097], [45.545076, 11.581821], [45.584014, 11.487064], [45.584495, 11.565685],
        ];


function addMarkers(response){
    for(i = 0; i < coord.length; i++)
    {
        var marker = L.marker(coord[i]).addTo(map);
        marker.bindPopup("Category: <br>" + response[i]).openPopup();
    }
}
