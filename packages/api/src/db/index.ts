import { Promise as SPromise } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Cake } from '../models/cake';
import { InitialiseUrl } from '../config';
import { CakeProps } from '../../../../types';
import { uniqWith, isEqual } from 'lodash';

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

    const uniqueCakes = uniqWith(cakes, isEqual);

    await SPromise.each(uniqueCakes, cake => Cake.create<Cake>(cake));
  }
}

export const db = new DB();
