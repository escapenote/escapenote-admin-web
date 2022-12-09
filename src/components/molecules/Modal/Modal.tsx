import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseOutlined } from '@ant-design/icons';

import { Box } from 'components/atoms';

const overlayVariants = {
  active: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  inactive: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

const overlayProps = {
  variants: overlayVariants,
  initial: 'inactive',
  animate: 'active',
  exit: 'inactive',
};

const modalVariants = {
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0,
    transition: {
      delay: 0.1,
    },
  },
};

const modalProps = {
  variants: modalVariants,
  initial: 'inactive',
  animate: 'active',
  exit: 'inactive',
};

interface IProps {
  isVisible: boolean;
  title?: string;
  width?: string;
  maskClosable?: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}
const Modal: React.FC<IProps> = ({
  isVisible,
  width,
  title,
  maskClosable = true,
  children,
  onClose,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const maintainModal = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
  };

  const modalContent = (
    <AnimatePresence>
      {isVisible && (
        <ModalOverlay
          {...overlayProps}
          onClick={() => {
            maskClosable && onClose();
          }}
        >
          <ModalContents width={width} {...modalProps} onClick={maintainModal}>
            <ModalHeader hasTitle={typeof title === 'string'}>
              {title && <ModalTitle>{title}</ModalTitle>}
              <CloseOutlined width={24} onClick={onClose} />
            </ModalHeader>
            <Box>{children}</Box>
          </ModalContents>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );

  return isBrowser
    ? ReactDOM.createPortal(
        modalContent,
        document.getElementById('modal') as HTMLDivElement,
      )
    : null;
};

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--black), 0.2);
  z-index: 10;
`;

const ModalHeader = styled.div<{ hasTitle: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${p => (p.hasTitle ? 'space-between;' : 'flex-end')};
`;

const ModalTitle = styled.div`
  font-size: var(--heading6);
  font-weight: bold;
`;

const ModalContents = styled(motion.div)<{ width?: string }>`
  position: relative;
  display: block;
  align-self: center;
  margin: 0 auto;
  border-radius: 4px;
  padding: 24px 28px;
  min-width: 360px;
  background-color: rgb(var(--background));
  box-shadow: 0px 12px 20px 0px rgba(var(--backgroundR), 0.1);
  overflow-y: scroll;
  overflow-x: hidden;

  ${p => p.width && `width : ${p.width}`}
`;

export default Modal;
