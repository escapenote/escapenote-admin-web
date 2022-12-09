import React from 'react';
import Link from 'next/link';
import { Tag as AntdTag, TagProps } from 'antd';

interface IProps extends TagProps {
  href?: string;
}
const Tag: React.FC<IProps> = ({ href, children, ...props }) => (
  <AntdTag {...props}>
    {href ? (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    ) : (
      children
    )}
  </AntdTag>
);

export default Tag;
