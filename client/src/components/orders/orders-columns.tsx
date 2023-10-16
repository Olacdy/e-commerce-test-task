import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/datatable-column-header';

import { formatDate } from '@/lib/utils';

import { OrderType } from '@/types/order-type';

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ row }) => (
      <div className='text-left'>{formatDate(row.original.createdAt)}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total' />
    ),
  },
  {
    accessorKey: 'userEmail',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='User Email' />
    ),
  },
  {
    id: 'collapse',
    enableHiding: false,
  },
];
