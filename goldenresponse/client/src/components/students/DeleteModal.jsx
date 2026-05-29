import { AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

function DeleteModal({ isOpen, onClose, onConfirm, studentName, isLoading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion" size="sm">
      <div className="text-center">
        {/* Warning Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-rose-400" />
        </div>

        {/* Message */}
        <p className="text-sm text-gray-300 mb-1">
          Are you sure you want to delete
        </p>
        <p className="text-base font-semibold text-white mb-2">
          {studentName || 'this student'}?
        </p>
        <p className="text-xs text-gray-500 mb-6">
          This action cannot be undone. All associated data will be permanently
          removed.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
