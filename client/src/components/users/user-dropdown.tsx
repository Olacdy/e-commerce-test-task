import { FC } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Icons } from '@/components/icons';

import { getUserName } from '@/lib/utils';

import { UserType } from '@/schemas/user-schemas';

type UserDropdownProps = {
  user: UserType | null;
  handleLogout: () => void;
};

const UserDropdown: FC<UserDropdownProps> = ({ user, handleLogout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <Icons.user className='cursor-pointer md:h-8 md:w-8' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{getUserName(user)}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to='/profile'>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className='text-red-800 dark:text-red-600 dark:hover:font-semibold dark:hover:text-white'>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
