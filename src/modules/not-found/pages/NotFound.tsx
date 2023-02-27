import Link from 'next/link';
import React, { FC } from 'react';
const NotFound: FC = () => {
  return (
    <>
      <h1>Page Not Found</h1>
      <Link href='/'>Back to home</Link>
    </>
  );
};

export default NotFound;
