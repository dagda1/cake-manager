import { Cake } from '../../models/cake';
import { Request, Response } from 'express';

export class CakesController {
  public static async All(req: Request, res: Response) {
    const cakes = await Cake.all();

    return res.send(cakes);
  }
}
