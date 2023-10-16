import { FC, useEffect, useState } from 'react';

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Icons } from '@/components/icons';

import OrderDescription from '@/components/orders/order-description';
import { columns } from '@/components/orders/orders-columns';

import useUserStore from '@/context/user-context';

import { OrderType } from '@/types/order-type';

type OrdersTableProps = {
  orders: OrderType[];
};

const OrdersTable: FC<OrdersTableProps> = ({ orders }) => {
  const { email, role } = useUserStore((state) => ({
    email: state.user?.email,
    role: state.user?.role,
  }));

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  useEffect(() => {
    if (role === 'admin') {
      table.getColumn('userEmail')?.toggleVisibility(true);
    } else {
      table.getColumn('userEmail')?.toggleVisibility(false);
    }
  }, [role, table]);

  const handleShowAllChange = (value: boolean) => {
    table.getColumn('userEmail')?.setFilterValue(value ? '' : email);
  };

  return (
    <div className='flex w-full max-w-lg flex-col gap-10 py-10 md:max-w-3xl lg:max-w-6xl'>
      {role === 'admin' && (
        <div className='flex items-center gap-3 self-end pr-4'>
          <Label htmlFor='all-mode'>Show all orders</Label>
          <Switch
            checked={
              ((table.getColumn('userEmail')?.getFilterValue() as string) ??
                '') !== email
            }
            onCheckedChange={handleShowAllChange}
            id='all-mode'
          />
        </div>
      )}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Collapsible key={row.id} asChild>
                  <>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => {
                        if (cell.id.includes('collapse')) {
                          return (
                            <TableCell
                              key={cell.id}
                              className='flex justify-end'>
                              <CollapsibleTrigger asChild>
                                <div className='group cursor-pointer px-3 py-1.5'>
                                  <Icons.down className='transition-transform group-data-[state=open]:rotate-180' />
                                </div>
                              </CollapsibleTrigger>
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    <CollapsibleContent asChild>
                      <tr>
                        <TableCell colSpan={10} className='py-7 pl-6 pr-10'>
                          <OrderDescription
                            orderDescriptions={row.original.orderDescriptions}
                          />
                        </TableCell>
                      </tr>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No orders.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersTable;
