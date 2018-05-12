import * as React from 'react';
import { CakeProps } from '../../../../../types';
import { MapStateToProps, connect } from 'react-redux';
import { State } from '../../reducers';
import { Layout, GelItem } from '@cutting/react-gel';
import { Cake } from '../../components/Cake';

export interface CakesContainerProps {
  cakes: CakeProps[];
}

export const mapStateToProps: MapStateToProps<CakesContainerProps, any, State> = (state: State) => {
  return {
    cakes: state.cakes
  };
};

const CakesContainerView: React.SFC<CakesContainerProps> = ({ cakes }) => (
  <Layout className="wrapper">
    {cakes.map((cake, i) => (
      <GelItem key={i} m="1/2" l="1/4">
        <Cake {...cake} />
      </GelItem>
    ))}
  </Layout>
);

export const Cakes = connect(mapStateToProps)(CakesContainerView);
