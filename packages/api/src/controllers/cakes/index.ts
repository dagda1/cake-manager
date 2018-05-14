import { Cake } from '../../models/cake';
import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CakeProps } from '../../../../../types';

export class CakesController {
  public static async allText(req: Request, res: Response) {
    const cakes = await CakesController.getCakes();

    const result = cakes.map(cake => `${cake.title} ${cake.desc}`).join('\n');

    res
      .type('text')
      .status(200)
      .send(result);
  }

  public static async all(req: Request, res: Response) {
    const cakes = await CakesController.getCakes();

    return res
      .type('json')
      .status(200)
      .send(cakes);
  }

  public static async create(req: Request, res: Response) {
    const fields: CakeProps = req.body;

    try {
      await Cake.create(fields);
      res.status(200).send();
    } catch (ex) {
      return res.status(400).send({ text: 'ERROR' });
    }
  }

  private static async getCakes() {
    const cakes = await Cake.all();

    return cakes.map(cake => omit(cake.dataValues, 'id'));
  }
}
