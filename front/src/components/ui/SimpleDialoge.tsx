import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/redux/ReduxHooks";

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
    const [mounted, setMounted] = useState(false);
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
    const {theme} = useAppSelector((state)=>state.UiManagerReducer);

    useEffect(() => {
        setMounted(true);
        const root = document.getElementById("modal-root");
        setModalRoot(root);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted || !modalRoot) return null;

    const dialogContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={closeOnOverlayClick ? onClose : undefined}
                        aria-hidden="true"
                    />

                    {/* Dialog Container */}
                    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none ${theme} `}>
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{
                                duration: 0.3,
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                            }}
                            className={`pointer-events-auto ${width} w-full bg-white dark:bg-neutral-800 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto`}
                        >
                            <div className="flex fixed items-start justify-between h-7 pr-5 pt-5 dark:border-neutral-700">
                                <h2 className="text-xl font-semibold">
                                    {title}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-1 cursor-pointer text-neutral-400 hover:text-gray-900 hover:dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
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
                            <div className="px-6 py-6">{children}</div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );

    return createPortal(dialogContent, modalRoot);
};

export default SimpleDialog;
