import React, { MouseEventHandler, useCallback } from 'react';
import { CloseModalButton, CreateMenu } from '@components/Menu/styles';

interface Props {
  children: React.ReactNode;
  style: React.CSSProperties;
  show: boolean;
  closeButton?: boolean;
  onCloseModal: (e: any) => void;
}

const Menu: React.FC<Props> = ({ children, style, show, closeButton, onCloseModal }) => {
  const stopPropagation: MouseEventHandler = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation}>
        {closeButton ? <CloseModalButton onClick={onCloseModal}></CloseModalButton> : null}
        {children}
      </div>
    </CreateMenu>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
