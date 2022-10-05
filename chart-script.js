let products=[];
let api_url='https://dummyjson.com/products';

(()=>{
    collect_products();
})();

async function collect_products() {
    const res = await fetch(api_url);
    const obj = await res.json();
    products = obj.products;
    console.log(products);
    $('#product-table').DataTable( {
        data: products,
        columns: [
            {data: 'images',
            "render": function (data) {
                return '<img img src="' + data[0] + '" " width="80px">';
            }},
            { data: 'title' },
            { data: 'description' },
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

