import classNames from 'classnames';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { Anchor } from '../../foundation/Anchor';
import { AspectRatio } from '../../foundation/AspectRatio';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { WidthRestriction } from '../../foundation/WidthRestriction';

import * as styles from './ProductHeroImage.styles';

async function loadImageAsDataURL(url: string): Promise<string> {
  return url.substring(0, url.length - 4) + ".jpg";
}

type Props = {
  product: ProductFragmentResponse;
  title: string;
};

export const ProductHeroImage: FC<Props> = ({ product, title }) => {
  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;

  const [imageDataUrl, setImageDataUrl] = useState<string>();

  useEffect(() => {
    if (thumbnailFile == null) {
      return;
    }
    loadImageAsDataURL(thumbnailFile.filename).then((dataUrl) => setImageDataUrl(dataUrl));
  }, [thumbnailFile]);

  if (imageDataUrl === undefined) {
    return null;
  }

  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <WidthRestriction>
            <Anchor href={`/product/${product.id}`}>
              <div className={styles.container()}>
                <AspectRatio ratioHeight={9} ratioWidth={16}>
                  <img className={styles.image()} src={imageDataUrl} />
                </AspectRatio>

                <div className={styles.overlay()}>
                  <p
                    className={classNames(styles.title(), {
                      [styles.title__desktop()]: deviceType === DeviceType.DESKTOP,
                      [styles.title__mobile()]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    {title}
                  </p>
                  <p
                    className={classNames(styles.description(), {
                      [styles.description__desktop()]: deviceType === DeviceType.DESKTOP,
                      [styles.description__mobile()]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    {product.name}
                  </p>
                </div>
              </div>
            </Anchor>
          </WidthRestriction>
        );
      }}
    </GetDeviceType>
  );
};

ProductHeroImage.displayName = 'ProductHeroImage';
