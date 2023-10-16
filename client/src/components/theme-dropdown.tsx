import { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Icons } from '@/components/icons';

import { Theme, useTheme } from '@/context/theme-context';

type ThemeDropdownProps = {};

const ThemeDropdown: FC<ThemeDropdownProps> = ({}) => {
  const { theme, changeTheme } = useTheme();

  console.log(theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          {theme === 'light' ? <Icons.light /> : <Icons.dark />}{' '}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-36'>
        <DropdownMenuLabel>Site theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => changeTheme(value as Theme)}>
          <DropdownMenuRadioItem value='light'>Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='dark'>Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='system'>System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeDropdown;
