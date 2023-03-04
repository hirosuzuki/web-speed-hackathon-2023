import type { FC } from 'react';
import { Helmet } from 'react-helmet';
import useSWR from 'swr'

import { Layout } from '../../components/application/Layout';
import { ProductList } from '../../components/feature/ProductList';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useFeatures } from '../../hooks/useFeatures';
import { useRecommendation } from '../../hooks/useRecommendation';

import * as styles from './Top.styles';

export const Top: FC = () => {
  const { recommendation } = useRecommendation();
  // const { features } = useFeatures();


  async function fetcher(url: string): Promise<any | null> {
    const response = await fetch(url);
    return response.json();
  }
  
  const { data: features, error, isLoading } = useSWR('/top.json', fetcher);
    
  if (recommendation === undefined || features === undefined || features === null) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
      </Helmet>
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
