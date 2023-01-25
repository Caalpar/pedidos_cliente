<script>
    	import { socket } from './socket-io.js';
        
        //store
        import {branch_officeData} from '../store/branch_office/branch_office.js'
        import {OrdersAllData} from '../store/order/oreder.js'

        setInterval(() => {
            socket.emit('branch-office-orders',{branch_office_id:$branch_officeData._id,numberOfOrders:$OrdersAllData.length})
            
        }, 1000);
        

        socket.on('branch-office-orders', data=>{
           // console.log('socket:',data)

            for (let index = 0; index < data.length; index++) {
                const order = data[index];
                let index_find = $OrdersAllData.findIndex( ord => ord._id == order._id)
                if(index_find == -1)
                {
                    $OrdersAllData.push(order)
                }
            }

            let content = document.getElementById('container')
                
            if(content){

                if(window.matchMedia("(max-width: 800px)").matches)
                content.style.width = (20 * $OrdersAllData.length) + 'rem'
                else
                content.style.width = (26 * $OrdersAllData.length) + 'rem'
    
            }
            $OrdersAllData = $OrdersAllData

            })

</script>