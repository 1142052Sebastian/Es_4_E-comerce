let products=[];
let api_url='https://dummyjson.com/carts';


(()=>{
    collect_products();
    console.log(localStorage.getItem("loggedUserIndex"));
    $(window).on('load', () => {
        $(".username").text(localStorage.getItem("loggedUsername"));
    });
})();

async function collect_products() {
    const res = await fetch(api_url);
    const obj = await res.json();
    products = obj.carts[localStorage.getItem("loggedUserIndex")].products;
    console.log(products);
    $('#product-table').DataTable( {
        data: products,
        columns: [
            { data: 'title' },
            { data: 'quantity'},    
            { data: 'price' },
            { data: 'discountPercentage'}  
        ]
    } );
}


$(".logout-btn").click(
    () => {
        localStorage.setItem("loggedUserIndex", -1);
        localStorage.setItem("loggedUsername", "");
        $(".logout-btn").attr("href", "index.html");
    }
)

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

