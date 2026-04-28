interface SimpleDialogProps {
isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  closeOnOverlayClick?: boolean;
  width?: string;
}

const SimpleDialog: React.FC<SimpleDialogProps> = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnOverlayClick = true,
  width = "max-w-lg",
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 
                   transition-opacity animate-fade-in "
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Centered dialog container */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 
                   pointer-events-none"
      >
        {/* Dialog content - pointer-events-auto allows interaction */}
        <div
          className={`
            pointer-events-auto ${width} w-full bg-white dark:bg-neutral-800 rounded-xl shadow-2xl animate-dialog-slide-in
     

            max-h-[90vh] overflow-y-auto
          `}
        >
          {title && (
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <h2 className="text-xl font-semibold ">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 text-neutral-400 hover:text-gray-600  hover:dark:text-white
                         hover:bg-gray-100 dark:hover:bg-neutral-600 rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {!title && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 
                       hover:bg-gray-100 rounded-lg z-10"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          <div className="px-6 py-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default SimpleDialog;