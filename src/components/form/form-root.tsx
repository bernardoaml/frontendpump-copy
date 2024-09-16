import type {FieldValues, UseFormReturn} from 'react-hook-form';

import {Form} from '@ui/form';

interface FormRootProps<T extends FieldValues>
  extends React.ComponentPropsWithoutRef<'form'> {
  // form: UseFormReturn<T,any, undefined>;
  form: UseFormReturn<T>;
}

const FormRoot = <T extends FieldValues>({
  form,
  ...props
}: FormRootProps<T>) => {
  return (
    <Form {...form}>
      <form {...props} />
    </Form>
  );
};

export {FormRoot};
