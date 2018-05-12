import { Model, Table, PrimaryKey, AutoIncrement, Column } from 'sequelize-typescript';

export interface CakeProps {
  title: string;
  desc: string;
  image: string;
}

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
