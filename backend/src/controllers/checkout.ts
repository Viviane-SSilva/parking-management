
import type { Request, Response } from "express";

async function checkoutParking(request: Request, response: Response) {

   console.log("Rota /checkout acessada com sucesso.");


   const { id, spotNumber, status, vehicleInfo } = request.body;      


   console.log("Dados recebidos no checkout:", { id, spotNumber, status, vehicleInfo });
}

module.exports = { checkoutParking };


