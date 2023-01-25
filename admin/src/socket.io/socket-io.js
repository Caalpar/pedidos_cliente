import { io } from 'socket.io-client'
import { SERVER } from '../global/global.js'

//export const socket = io('http://35.192.0.219:8081', { transports: ['websocket'] })
export const socket = io(SERVER, { transports: ['websocket'] })