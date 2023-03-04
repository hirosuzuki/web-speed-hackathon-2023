import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';
import { loadFonts } from '../../utils/load_fonts';
import { Image } from '../../components/foundation/Image';

import * as styles from './NotFound.styles';

export const NotFound: FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsReady(true);
    };

    load();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>ページが見つかりませんでした</title>
      </Helmet>
      <Layout>
        <div className={styles.container()}>
          <div className={styles.inner()}>
            <p><Image height={69} src={"/icons/notfound.gif"} width={247} /></p>
          </div>
        </div>
      </Layout>
    </>
  );
};
