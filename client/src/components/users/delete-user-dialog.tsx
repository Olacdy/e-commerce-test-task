import { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type DeleteUserDialogProps = {
  handleDelete: () => void;
  closeDialog: () => void;
};

const DeleteUserDialog: FC<DeleteUserDialogProps> = ({
  handleDelete,
  closeDialog,
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete user
          account.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          onClick={() => {
            handleDelete();
            closeDialog();
          }}
          variant='destructive'
          className='dark:text-foreground'>
          Delete
        </Button>
        <Button onClick={closeDialog} variant='outline'>
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteUserDialog;
