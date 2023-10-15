import { FC, useState } from 'react';

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

import useCartStore from '@/context/cart-context';

import { ItemType } from '@/types/item-type';

type ItemsTableProps = {
  items: ItemType[];
};

const ItemsTable: FC<ItemsTableProps> = ({ items }) => {
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
    <div className='w-full max-w-lg px-10 pb-10 md:max-w-3xl lg:max-w-6xl'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter name...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
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
                        <TableCell colSpan={3}>
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
