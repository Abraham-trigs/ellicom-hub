import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const jobTypes = [
  'Photocopy',
  'Printing',
  'Scanning',
  'Binding',
  'Lamination',
  'Flyer Design',
  'Business Cards',
  'Thesis Print',
  'Banner',
  'CV Print',
];

const backdropStyle = `
  fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50
`;

const modalStyle = `
  bg-container text-coHead rounded-2xl p-6 w-[90%] max-w-md shadow-2xl border border-sea
`;

const JobTypeModal = ({ open, onClose, onSelect }) => {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={backdropStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={modalStyle}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-head text-center">Select Job Type</h2>
            <div className="grid grid-cols-2 gap-3">
              {jobTypes.map(type => (
                <button
                  key={type}
                  onClick={() => {
                    onSelect(type);
                    onClose();
                  }}
                  className="bg-sea text-ground font-bold py-2 px-4 rounded-xl hover:bg-high transition"
                >
                  {type}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full bg-ground text-coHead border border-coHead py-2 rounded-xl hover:bg-coHead hover:text-ground"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default JobTypeModal;
