import * as React from 'react';
import { renderFormInput, Field } from '@cutting/connected-components';
import { Form, InjectedFormProps, reduxForm, FormErrors } from 'redux-form';
import { CakeFormName } from '../../config';
import { Button, ButtonStyle } from '@cutting/component-library';
import { Wrap, Layout, GelItem } from '@cutting/react-gel';
import { CakeProps } from '../../../../../types';
import { Dispatch } from 'redux';

const styles = require('./CakeForm.scss');

export interface CakeFormProps extends CakeProps {
  cancelHandler: () => void;
}

type Props = CakeFormProps & InjectedFormProps;

export const validate = (values: CakeFormProps, props: Props) => {
  const errors: FormErrors<CakeFormProps> = {};

  if (!values.title) {
    errors.title = 'You must supply a title.';
  }

  if (!values.desc) {
    errors.desc = 'You must supply a description.';
  }

  if (!values.image) {
    errors.image = 'You must supply an image url.';
  }

  return errors;
};

export class CakeFormView extends React.Component<Props> {
  cancelHandler = () => {
    this.props.cancelHandler();
  };

  submitForm = (values: CakeProps, dispatch: Dispatch<any>, meta: object) => {};

  render() {
    const { handleSubmit } = this.props;

    return (
      <Wrap className={styles.container}>
        <Layout center>
          <GelItem s="1/2">
            <Form onSubmit={handleSubmit(this.submitForm as any)}>
              <Field name="title" component={renderFormInput} label="Title" maxLength={100} />
              <Field name="desc" component={renderFormInput} label="Description" maxLength={254} />
              <Field name="image" component={renderFormInput} label="Image Url" maxLength={500} />
              <div className={styles.button__container}>
                <Button onClick={this.cancelHandler}>Cancel</Button>
                <Button type="submit" buttonStyle={ButtonStyle.Primary}>
                  Add
                </Button>
              </div>
            </Form>
          </GelItem>
        </Layout>
      </Wrap>
    );
  }
}

export const CakeForm = reduxForm<Props, any>({ form: CakeFormName, validate })(CakeFormView);
