import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/datatable-column-header';

import { ItemType } from '@/types/item-type';

export const columns: ColumnDef<ItemType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <div className='text-left capitalize'>{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
  },
  {
    id: 'collapse',
    enableHiding: false,
  },
];
