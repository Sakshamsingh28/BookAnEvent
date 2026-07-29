import React, { useState } from 'react';
import { Smartphone, Share, PlusSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PWAInstallModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Install Prompt Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 flex items-center justify-between text-xs font-medium shadow-xs">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-blue-200" />
          <span>Install <strong>BookAnEvent</strong> PWA app on your phone</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-1 rounded-full bg-white text-blue-600 font-semibold text-[11px] shadow-xs active:scale-95 transition-transform"
        >
          How to Install
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm bg-white rounded-3xl p-6 border border-[#EAEAEA] shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#1D1D1F] text-white flex items-center justify-center font-heading font-bold text-lg">
                    B
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#1D1D1F]">
                      Install BookAnEvent
                    </h3>
                    <p className="font-body text-xs text-[#6E6E73]">Native iOS PWA Experience</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-[#1D1D1F] flex items-center gap-1">
                      Tap Share button <Share className="w-3.5 h-3.5 text-blue-600" />
                    </p>
                    <p className="text-[#6E6E73] mt-0.5">
                      In Safari browser, tap the Share icon at the bottom of your screen.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-[#1D1D1F] flex items-center gap-1">
                      Add to Home Screen <PlusSquare className="w-3.5 h-3.5 text-blue-600" />
                    </p>
                    <p className="text-[#6E6E73] mt-0.5">
                      Scroll down in the share menu and select "Add to Home Screen".
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-2xl bg-[#1D1D1F] text-white font-medium text-xs active:scale-98 transition-transform"
              >
                Got It, Thanks!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
