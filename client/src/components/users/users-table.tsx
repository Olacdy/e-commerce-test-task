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
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
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

import DeleteUserDialog from '@/components/users/delete-user-dialog';
import { columns } from '@/components/users/users-columns';

import { UserType } from '@/types/user-type';

type UsersTableProps = {
  users: UserType[];
  handlePromote: (userId: string) => void;
  handleDelete: (userId: string) => void;
};

const UsersTable: FC<UsersTableProps> = ({
  users,
  handlePromote,
  handleDelete,
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: users,
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
    <Dialog open={isDialogOpened} onOpenChange={setIsDialogOpened}>
      <div className='w-full max-w-lg px-10 pb-10 md:max-w-3xl lg:max-w-6xl'>
        <div className='flex items-center py-4'>
          <Input
            placeholder='Filter email...'
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        </div>
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
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      if (
                        cell.id.includes('promote') &&
                        row.original.role !== 'admin'
                      ) {
                        return (
                          <TableCell key={cell.id}>
                            <Button
                              onClick={() => handlePromote(row.original.id)}
                              variant='outline'
                              className='gap-1.5'>
                              <p>Promote</p>
                              <Icons.promote className='h-6 w-6' />
                            </Button>
                          </TableCell>
                        );
                      }

                      if (cell.id.includes('edit')) {
                        return (
                          <TableCell key={cell.id}>
                            <Link to={`/users/${row.original.id}`}>
                              <Button className='gap-3'>
                                <p>Edit</p>
                                <Icons.profile className='h-4 w-4' />
                              </Button>
                            </Link>
                          </TableCell>
                        );
                      }

                      if (cell.id.includes('delete')) {
                        return (
                          <TableCell key={cell.id}>
                            <DialogTrigger asChild>
                              <Button
                                onClick={() =>
                                  setSelectedUserId(row.original.id)
                                }
                                variant='destructive'
                                className='gap-3 dark:text-foreground'>
                                <p>Delete</p>
                                <Icons.delete className='h-4 w-4' />
                              </Button>
                            </DialogTrigger>
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={cell.id} className='truncate'>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
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
      <DeleteUserDialog
        handleDelete={() => handleDelete(selectedUserId!)}
        closeDialog={() => {
          setSelectedUserId(null);
          setIsDialogOpened(false);
        }}
      />
    </Dialog>
  );
};

export default UsersTable;
