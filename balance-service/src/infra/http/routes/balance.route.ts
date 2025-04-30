import { GetBalanceUseCase } from "@core/usecases/get-balance.usecase";
import { Request, Response } from "express";
import { Router } from "express";

export function createBalanceRouter(getBalanceUseCase: GetBalanceUseCase): Router {
  const balanceRouter = Router();

  balanceRouter.get("/:account_id", async (req: Request, res: Response) => {
    try {
      const input = { accountId: req.params.account_id }
      const output = await getBalanceUseCase.execute(input)
      res.status(200).json(output);
    } catch (error) {
      console.error("Error getting balance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return balanceRouter;
}
