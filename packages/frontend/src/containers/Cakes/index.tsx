import * as React from 'react';
import { CakeProps } from '../../../../../types';
import { MapStateToProps, connect } from 'react-redux';
import { Layout, GelItem } from '@cutting/react-gel';
import { Button, Modal } from '@cutting/component-library';
import { Cake } from '../../components/Cake';
import { CakeForm } from '../CakeForm';
import { cakesSelector, isLoadingSelector } from '../../selectors';
import { State } from '../../reducers/types';

const styles = require('./Cakes.scss');

export interface CakesContainerProps {
  cakes: CakeProps[];
  isLoading: boolean;
}

export interface CakesContainerState {
  modalOpen: boolean;
}

export const mapStateToProps: MapStateToProps<CakesContainerProps, any, State> = (state: State) => {
  return {
    cakes: cakesSelector(state),
    isLoading: !!isLoadingSelector(state)
  };
};

export class CakesContainerView extends React.Component<CakesContainerProps, CakesContainerState> {
  constructor(props: CakesContainerProps) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  static defaultProps = {
    cakes: []
  };

  componentDidUpdate(prevProps: CakesContainerProps) {
    const { isLoading } = this.props;

    if (isLoading === prevProps.isLoading) {
      return;
    }

    if (prevProps.isLoading === true && isLoading === false) {
      this.closeModal();
    }
  }

  setModalOpenState = (open: boolean) => this.setState({ modalOpen: open });

  openModal = () => this.setModalOpenState(true);

  closeModal = () => this.setModalOpenState(false);

  render() {
    const { cakes, isLoading } = this.props;
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
            <CakeForm cancelHandler={this.closeModal} isLoading={isLoading} />
          </div>
        </Modal>
        <Layout className={styles.container}>
          <GelItem>
            <Button onClick={this.openModal}>Add Cake</Button>
          </GelItem>
          {cakes.map((cake, i) => (
            <GelItem key={i} m="1/2" l="1/3">
              <Cake {...cake} />
            </GelItem>
          ))}
        </Layout>
      </>
    );
  }
}

export const Cakes = connect(mapStateToProps)(CakesContainerView);
