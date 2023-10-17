import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/datatable-column-header';

import { UserType } from '@/schemas/user-schemas';

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='First Name' />
    ),
    cell: ({ row }) => (
      <div className='text-left capitalize'>{row.getValue('firstName')}</div>
    ),
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Name' />
    ),
    cell: ({ row }) => (
      <div className='text-left capitalize'>{row.getValue('lastName')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
  },
  {
    id: 'promote',
    enableHiding: false,
  },
  {
    id: 'edit',
    enableHiding: false,
  },
  {
    id: 'delete',
    enableHiding: false,
  },
];
