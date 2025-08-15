import express from express
import {realtimeLocation} from "../controllers/realtimeLocation.controller.js"

const route = express.Route()

route.post('/realtime-Location', realtimeLocation)

export default route

