
export const PrintOrder = (order) =>{
    let orders = ''

    for (let index = 0; index < order.order.length; index++) {
        const ord = order.order[index];
        orders += `
            <div style="padding: .5rem; font-size: large; font-weight: bold;">
                <div>
                    - ${ord.porduct_name}
                </div>
                <div style=" font-weight: 100;font-size: smaller; margin-left: .5rem;" >
                    ${ord.product_description}
                </div>
            </div>
            <div style="padding: .5rem; font-size: large; font-weight: bold; text-align: right;">
                $ ${ord.product_price}
            </div>
        `
    }



    let text = `
    <div style=" text-align: center; padding: .5rem;">
         ${new Date(order.date).toLocaleString()}
    </div>
    <div style="font-size: larger;padding: .5rem;">
            CLIENTE: ${order.id_user.first_name} ${order.id_user.last_name}
    </div>          
    <div style="font-size: larger;padding: .5rem;">
            DIR: ${order.id_user.address}
    </div>       
    <div style="font-size: larger;padding: .5rem;">
            TEL: ${order.id_user.phone}
    </div> 
    <div style="font-size: larger;padding: .5rem;">
            DELIVERY: ${order.id_delivery? order.id_delivery.first_name + order.id_uid_deliveryser.last_name: 'Sin delivery'}
    </div>
    <hr>
    <div style="font-size: larger;padding: .5rem; text-align: center;">
            DETALLE
    </div>
    <hr>
    <div style=" padding: 1rem; text-align: right;">
     ${order.description}
    </div>
    <hr>
    <div style="font-size: larger;padding: .5rem; text-align: center;">
            PEDIDO ${order.oreder_number>10 ? order.oreder_number: '0'+order.oreder_number }
    </div>
    <hr>
    <div style=" display: grid; grid-template-columns: 50% 50%; ">
        ${orders}
    </div>
    <hr>
    <div style="display: grid; grid-template-columns: 50% 50%;">
        <div style="padding: .5rem; font-size: large; font-weight: bold;">
            TOTAL
        </div>
        <div style="padding: .5rem; font-size: large; font-weight: bold; text-align: right;">
            ${CalTotal(order.order)}
        </div>
    </div>
    `

    let a = window.open('', '', 'height=500, width=500');
    a.document.write('<html>');
    a.document.write(`<body>`);
    a.document.write(text);
    a.document.write('</body>');
    a.document.write('</html>');
}

const CalTotal = (pedido) =>{
   
    let result = 0
    for (let index = 0; index < pedido.length; index++) {
        const ord = pedido[index];
        result +=ord.product_price
    }
    return result

}