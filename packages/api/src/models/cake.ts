import { Model, Table, PrimaryKey, AutoIncrement, Column } from 'sequelize-typescript';
import { CakeProps } from '../../../../types';

@Table
export class Cake extends Model<Cake> implements CakeProps {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column title: string;

  @Column desc: string;

  @Column image: string;
}
