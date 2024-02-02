import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import Image from "next/image";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface IModal {
  className?: string;
  bodyClassName?: string;
  isOpen: boolean;
  children?: React.ReactNode;
  preventOutsideClickHide?: boolean;
  onClose: () => void;
  onlyBody?: boolean;
  darkMode:boolean;
}

const Modal: React.FC<IModal> = ({
  className,
  bodyClassName,
  isOpen,
  onClose,
  onlyBody,
  children,
  preventOutsideClickHide,
  darkMode
}) => {
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    setOpenModal(isOpen);
  }, [isOpen]);

  return (
    <>
      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className={`relative z-[959590] ${className}`}
          onClose={() => !preventOutsideClickHide && closeModal()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={`fixed inset-0 bg-black ${darkMode?"bg-opacity-60":"bg-opacity-25"} overflow-y-auto`} />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-scroll">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`relative ${
                    !onlyBody && "pt-8 pb-6 px-6"
                  } my-10 min-w-[400px] max-w-[400px] h-auto ${darkMode?"bg-gray-600":"bg-white"} rounded-lg shadow-2xl transform transition-all ${bodyClassName}`}
                >
                  <div className="w-full">
                    <Dialog.Description as="div">{children}</Dialog.Description>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
