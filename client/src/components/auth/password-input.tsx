import { FC, useState } from 'react';

import { Icons } from '@/components/icons';
import { Input, InputProps } from '@/components/ui/input';

type PasswordInputProps = {
  isLoading: boolean;
  placeholder?: string;
} & InputProps;

const PasswordInput: FC<PasswordInputProps> = ({
  isLoading,
  placeholder = 'Password',
  ...field
}) => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const Icon = Icons[isShowing ? 'eyeOff' : 'eye'];

  const toggleShowing = () => {
    setIsShowing((prev) => !prev);
  };

  return (
    <div className='relative'>
      <Input
        type={isShowing ? 'text' : 'password'}
        disabled={isLoading}
        placeholder={placeholder}
        {...field}
      />
      <Icon
        onClick={toggleShowing}
        className='absolute inset-y-2 right-4 cursor-pointer stroke-muted-foreground transition hover:stroke-muted'
      />
    </div>
  );
};

export default PasswordInput;
