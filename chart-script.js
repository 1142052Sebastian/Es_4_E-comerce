let products=[];
let api_url='https://dummyjson.com/carts';


(()=>{
    collect_products();
    console.log(api_url);
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

