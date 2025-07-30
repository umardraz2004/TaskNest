import { motion, AnimatePresence } from "framer-motion";

const EmailSendingModal = ({ open, text, showSpin }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-gradient-to-br from-gray-800 to-gray-700 text-white px-6 py-4 rounded-2xl shadow-xl max-w-sm w-full"
          >
            <div className="flex items-center gap-3">
              {showSpin && (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              <span className="text-sm font-medium">{text}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailSendingModal;
