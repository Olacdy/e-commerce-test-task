import { FC } from 'react';

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

import { UserType } from '@/types/user-type';

type UserDropdownProps = {
  user: UserType | null;
  handleLogout: () => void;
};

const UserDropdown: FC<UserDropdownProps> = ({ user, handleLogout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icons.user />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{getUserName(user)}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
