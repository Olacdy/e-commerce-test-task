import { FC, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import { toast } from 'sonner';

import snakecaseKeys from 'snakecase-keys';

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

import useTokenStore from '@/context/token-context';
import useUserStore from '@/context/user-context';

import { getApiUrl } from '@/lib/utils';

import { editUserSchema } from '@/schemas/user-schemas';

import { UserType } from '@/types/user-type';

type EditUserFormProps = {
  user: UserType;
  updateUser: (user: UserType) => void;
  me: boolean;
};

const EditUserForm: FC<EditUserFormProps> = ({ user, updateUser, me }) => {
  const token = useTokenStore((state) => state.token);
  const userStore = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof editUserSchema>) => {
    setIsLoading(true);

    const requestOptions = {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(snakecaseKeys({ user: { ...values } })),
    };

    try {
      const response = await fetch(
        `${getApiUrl()}/users/${user.id}`,
        requestOptions
      );

      if (!response.ok) throw new Error(`${response.status}`);

      const data = await response.json();

      if (me) {
        userStore.setUser(data as UserType);
      }

      form.reset(data);

      updateUser(data as UserType);
    } catch (error: any) {
      toast.error('Something went wrong, try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='mx-10 w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-center'>Edit User</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-1.5 md:gap-2 lg:gap-3'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder='John' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder='Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={true} defaultValue={user.email} />
              </FormControl>
              <FormMessage />
            </FormItem>

            <Button disabled={isLoading} type='submit' className='mt-5'>
              Update user
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditUserForm;
