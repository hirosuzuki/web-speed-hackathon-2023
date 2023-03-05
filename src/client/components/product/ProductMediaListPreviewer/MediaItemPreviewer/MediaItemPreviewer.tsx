import classNames from 'classnames';
import type { FC } from 'react';

import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import { getMediaType } from '../../../../utils/get_media_type';
import { DeviceType, GetDeviceType } from '../../../foundation/GetDeviceType';
import { Image } from '../../../foundation/Image';

import * as styles from './MediaItemPreiewer.styles';

type Props = {
  file: MediaFileFragmentResponse;
};

export const MediaItemPreviewer: FC<Props> = ({ file }) => {
  const type = getMediaType(file.filename);

  const conv_hero_image_filename = (fn: string) => {
    return fn.substring(0, fn.length - 4) + "-h.webp"
  }

  return (
    <div className={styles.container()}>
      {type === 'image' && <Image fill src={conv_hero_image_filename(file.filename)} />}
      {type === 'video' && (
        <GetDeviceType>
          {({ deviceType }) => (
            <video
              autoPlay
              controls
              muted
              playsInline
              className={classNames(styles.video(), {
                [styles.video__desktop()]: deviceType === DeviceType.DESKTOP,
                [styles.video__mobile()]: deviceType === DeviceType.MOBILE,
              })}
              src={file.filename}
            />
          )}
        </GetDeviceType>
      )}
    </div>
  );
};
