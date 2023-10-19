import { FC, useState } from 'react';

import { Link } from 'react-router-dom';

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Icons } from '@/components/icons';

import ItemContent from '@/components/items/item-content';
import { columns } from '@/components/items/items-columns';

import useUserStore from '@/context/user-context';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import useCartStore from '@/context/cart-context';
import { ItemType } from '@/schemas/item-schemas';

type ItemsTableProps = {
  items: ItemType[];
};

const ItemsTable: FC<ItemsTableProps> = ({ items }) => {
  const role = useUserStore((state) => state.user?.role);

  const addToCart = useCartStore((state) => state.addToCart);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: items,
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

  return (
    <div className='w-full max-w-lg px-10 pb-28 md:max-w-3xl lg:max-w-6xl'>
      <div className='flex items-center justify-between gap-4 py-4'>
        <Input
          placeholder='Filter name...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        {role === 'admin' && (
          <Link className='min-w-fit' to='/item'>
            <Button>Add Item</Button>
          </Link>
        )}
      </div>
      <div className='rounded-md border'>
        <Table className=''>
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
                    <CollapsibleTrigger asChild type={undefined}>
                      <TableRow className='group cursor-pointer'>
                        {row.getVisibleCells().map((cell) => {
                          if (cell.id.includes('collapse')) {
                            return (
                              <TableCell
                                key={cell.id}
                                className='flex justify-end'>
                                <div className='px-3 py-1.5'>
                                  <Icons.down className='transition-transform group-data-[state=open]:rotate-180' />
                                </div>
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
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                      <tr>
                        <TableCell colSpan={columns.length}>
                          <ItemContent
                            item={row.original}
                            addToCart={addToCart}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ItemsTable;
