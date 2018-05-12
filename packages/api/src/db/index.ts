import { Promise as SPromise } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Cake, CakeProps } from '../models/cake';
import { InitialiseUrl } from '../config';

class DB {
  sequelize: Sequelize;

  async initialise() {
    this.sequelize = new Sequelize({
      database: '__',
      dialect: 'sqlite',
      username: 'root',
      password: '',
      storage: ':memory:'
    });

    this.sequelize.addModels([Cake]);

    await this.sequelize.sync({ force: true });

    const response = await fetch(InitialiseUrl);

    const cakes: CakeProps[] = await response.json();

    await SPromise.each(cakes, cake => Cake.create<Cake>(cake));
  }
}

export const db = new DB();
