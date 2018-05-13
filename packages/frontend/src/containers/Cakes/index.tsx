import * as React from 'react';
import { CakeProps } from '../../../../../types';
import { MapStateToProps, connect } from 'react-redux';
import { State } from '../../reducers';
import { Layout, GelItem } from '@cutting/react-gel';
import { Button, Modal } from '@cutting/component-library';
import { Cake } from '../../components/Cake';
import { CakeForm } from '../CakeForm';
import { cakesSelector } from '../../selectors';

const styles = require('./Cakes.scss');

export interface CakesContainerProps {
  cakes: CakeProps[];
}

export interface CakesContainerState {
  modalOpen: boolean;
}

export const mapStateToProps: MapStateToProps<CakesContainerProps, any, State> = (state: State) => {
  return {
    cakes: cakesSelector(state)
  };
};

export class CakesContainerView extends React.Component<CakesContainerProps, CakesContainerState> {
  constructor(props: CakesContainerProps) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  setModalOpenState = (open: boolean) => this.setState({ modalOpen: open });

  openModal = () => this.setModalOpenState(true);

  closeModal = () => {
    this.setModalOpenState(false);
  };

  render() {
    const { cakes } = this.props;
    const { modalOpen } = this.state;

    return (
      <>
        <Modal
          heading="Add a Cake"
          footer="Acme Cakes"
          description="accessibiltiy description that is screen reader only"
          openHandler={this.setModalOpenState}
          open={modalOpen}
        >
          <div className={styles.modal__body}>
            <CakeForm cancelHandler={this.closeModal} />
          </div>
        </Modal>
        <Layout className={styles.container}>
          <GelItem>
            <Button onClick={this.openModal}>Add Cake</Button>
          </GelItem>
          {cakes.map((cake, i) => (
            <GelItem key={i} m="1/2" l="1/4">
              <Cake {...cake} />
            </GelItem>
          ))}
        </Layout>
      </>
    );
  }
}

export const Cakes = connect(mapStateToProps)(CakesContainerView);
