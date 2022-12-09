import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface IProps {
  from: number;
  to: number;
}
const Counter: React.FC<IProps> = ({ from, to }) => {
  const nodeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;
    const node = nodeRef.current;

    const controls = animate(from, to, {
      ease: 'easeOut',
      duration: 0.6,
      onUpdate(value) {
        node.textContent = parseInt(value.toFixed(0)).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef} />;
};

export default Counter;
