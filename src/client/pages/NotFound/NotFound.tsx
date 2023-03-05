import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { Layout } from '../../components/application/Layout';
import { Image } from '../../components/foundation/Image';

import * as styles from './NotFound.styles';

export const NotFound: FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.title = `ページが見つかりませんでした`;
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
      <Layout>
        <div className={styles.container()}>
          <div className={styles.inner()}>
            <p><Image alt="ページが存在しません" height={69} src={"/icons/notfound.gif"} width={247} /></p>
          </div>
        </div>
      </Layout>
    </>
  );
};
