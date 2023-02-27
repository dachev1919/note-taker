import { FC, PropsWithChildren } from 'react';
import styles from './Layout.module.scss';
import Meta from './meta/Meta';
import { ISeo } from './meta/meta.interface';
import {Container} from "react-bootstrap";

interface ILayout extends ISeo {}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, ...rest }) => {
  return (
    <>
      <Meta {...rest} />
      <div className={styles.layout}>
        <main>
          <Container fluid='xxl' className='my-4'>
            { children }
          </Container>
        </main>
      </div>
    </>
  );
};

export default Layout;