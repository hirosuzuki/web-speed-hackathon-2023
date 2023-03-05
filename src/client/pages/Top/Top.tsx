import type { FC } from 'react';
import { useEffect } from 'react';
import useSWR from 'swr'

import { Layout } from '../../components/application/Layout';
import { ProductList } from '../../components/feature/ProductList';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useRecommendation } from '../../hooks/useRecommendation';

import * as styles from './Top.styles';

export const Top: FC = () => {
  const { recommendation } = useRecommendation();

  async function fetcher(url: string): Promise<any | null> {
    const response = await fetch(url);
    return response.json();
  }
  
  const { data: features } = useSWR('/features.json', fetcher);
    
  useEffect(() => { document.title = `買えるオーガニック`; });

  if (recommendation === undefined || features === undefined || features === null) {
    return null;
  }

  return (
    <>
      <Layout>
        <div>
          <ProductHeroImage product={recommendation.product} title="今週のオススメ" />

          <div className={styles.featureList()}>
            {features.map((featureSection: any) => {
              return (
                <div key={featureSection.id} className={styles.feature()}>
                  <h2 className={styles.featureHeading()}>{featureSection.title}</h2>
                  <ProductList featureSection={featureSection} />
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};
