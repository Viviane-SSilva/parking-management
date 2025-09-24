const Router = require("express").Router;
const { checkoutParking } = require("../controllers/checkout");

const routes = Router();

routes.post("/checkout", checkoutParking);



export { routes };