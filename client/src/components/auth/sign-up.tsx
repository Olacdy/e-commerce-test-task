import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';

import { toast } from 'sonner';

import snakecaseKeys from 'snakecase-keys';

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

import { signUpSchema } from '@/schemas/auth-schemas';

import { UserType } from '@/types/user-type';

const SignUp = () => {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snakecaseKeys({ user: { ...values } })),
    };

    try {
      const response = await fetch(`${getApiUrl()}/signup`, requestOptions);

      if (!response.ok) throw new Error(`${response.status}`);

      const user = (await response.json()).data;
      const token = response.headers.get('Authorization')?.split(' ')[1];

      tokenStore.setToken(token as string);
      userStore.setUser(user as UserType);

      form.reset();
    } catch (error: any) {
      form.resetField('password');
      form.resetField('confirmPassword');

      if (error.message == 422) {
        toast.error('User with this email already exists.');
        return;
      }

      toast.error('Something went wrong, try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='mx-10 w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-center'>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-1.5 md:gap-2 lg:gap-3'>
            <div className='flex items-center justify-between gap-3'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder='John'
                        {...field}
                      />
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
                      <Input
                        disabled={isLoading}
                        placeholder='Doe'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <div className='flex flex-col gap-5'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        disabled={isLoading}
                        placeholder='Password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type='password'
                        disabled={isLoading}
                        placeholder='Confirm Password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isLoading} type='submit' className='mt-5'>
              Create an account
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex-col'>
        <p>Already have a account&#63;</p>
        <Link
          className={cn({ 'pointer-events-none': isLoading })}
          to='/auth/signin'>
          <Button disabled={isLoading} variant='link'>
            Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
