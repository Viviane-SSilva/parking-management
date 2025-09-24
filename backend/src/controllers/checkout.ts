
import type { Request, Response } from "express";

async function checkoutParking(request: Request, response: Response) {

   console.log("Rota /checkout acessada com sucesso.");


   const { id, spotNumber, status, vehicleInfo } = request.body;

   try {

      if (!id || !spotNumber || !status || !vehicleInfo) {
         return response.status(400).json({ error: "Campos obrigatórios." });
      }

      return response.status(200).json({ message: "Checkout realizado com sucesso." });

   }
   catch (error) {
      return response.status(404).json({ error: "Não foi registrado no banco." });
   }


   console.log("Dados recebidos no checkout:", { id, spotNumber, status, vehicleInfo });
}

module.exports = { checkoutParking };


