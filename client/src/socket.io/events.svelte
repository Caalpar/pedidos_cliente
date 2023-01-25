<script>
    	import { socket } from './socket-io.js';
        
        //store
        import {CurrentOrdersAllData} from '../store/order/oreder.js'
        import {loginData} from '../store/user/login.js'
        
        setInterval(() => {
                socket.emit('client-orders', {client_id: $loginData._id , Orders:$CurrentOrdersAllData})       
        }, 1000);

        socket.on('client-orders', orders =>{
            $CurrentOrdersAllData = orders
        })

        socket.on('client-orders-delete', orders=>{
            console.log('delete order',orders)

            if (orders.length>0) {
                for (let index = 0; index < orders.length; index++) {
                    const ord = orders[index];
                    let index_ord = $CurrentOrdersAllData.findIndex(order=> order._id == ord)

                    if(index_ord != -1){
                        $CurrentOrdersAllData.splice(index_ord,1)
                        $CurrentOrdersAllData = $CurrentOrdersAllData
                    }
                }
            }
        })

</script>