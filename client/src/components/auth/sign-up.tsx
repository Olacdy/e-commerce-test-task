import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

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

import { signUpSchema } from '@/schemas/auth-schemas';
import { Link } from 'react-router-dom';

type SignUpProps = {};

const SignUp: FC<SignUpProps> = ({}) => {
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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <Card className='mx-10'>
      <CardHeader>
        <CardTitle className='text-center'>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder='John' {...field} />
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
                      <Input placeholder='Doe' {...field} />
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
                    <Input placeholder='example@example.com' {...field} />
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
                      <Input placeholder='Password' {...field} />
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
                      <Input placeholder='Confirm Password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' className='mt-5'>
              Create an accoun
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex-col'>
        <p>Already have a account?</p>
        <Link to='/auth/signin'>
          <Button variant='link'>Sign In</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
