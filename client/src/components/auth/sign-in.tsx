import { FC, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import { Link, redirect } from 'react-router-dom';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

import { cn, getApiUrl } from '@/lib/utils';

import { signInSchema } from '@/schemas/auth-schemas';

import { UserType } from '@/types/user-type';

type SignInProps = {};

const SignIn: FC<SignInProps> = ({}) => {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setIsLoading(true);

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { ...values } }),
    };

    try {
      const response = await fetch(`${getApiUrl()}/login`, requestOptions);

      const user = (await response.json()).status.data.user;
      const token = response.headers.get('Authorization')?.split(' ')[1];

      tokenStore.setToken(token as string);
      userStore.setUser(user as UserType);

      form.reset();

      redirect('/');
    } catch (error) {
      form.resetField('password');

      toast.error('Something went wrong, try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='mx-10 w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-center'>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-1.5 md:gap-2 lg:gap-3'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='example@example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type='submit' className='mt-5'>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex-col'>
        <p>Don&rsquo;t have an account&#63;</p>
        <Link
          className={cn({ 'pointer-events-none': isLoading })}
          to='/auth/signup'>
          <Button disabled={isLoading} variant='link'>
            Sign Up
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
