import { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import useTokenStore from '@/context/token-context';

import { ItemType, formItemSchema } from '@/schemas/item-schemas';

import { getApiUrl } from '@/lib/utils';

type ItemFormProps = {
  item?: ItemType;
};

const ItemForm: FC<ItemFormProps> = ({ item }) => {
  const redirect = useNavigate();

  const token = useTokenStore((state) => state.token);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formItemSchema>>({
    resolver: zodResolver(formItemSchema),
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      price: item?.price || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formItemSchema>) => {
    setIsLoading(true);

    const requestOptions = {
      method: item ? 'PUT' : 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...values }),
    };

    try {
      const response = await fetch(
        `${getApiUrl()}/items${item ? `/${item.id}` : ''}`,
        requestOptions
      );

      if (!response.ok) throw new Error(`${response.status}`);

      toast.success(`Item successfully ${item ? 'edited' : 'added'}.`);

      redirect('/');
    } catch (error) {
      toast.error('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='mx-10 w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-center'>{`${
          item ? 'Edit' : 'Add'
        } Item`}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-1.5 md:gap-2 lg:gap-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Item name...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder='About item...'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type='submit' className='mt-5'>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ItemForm;
