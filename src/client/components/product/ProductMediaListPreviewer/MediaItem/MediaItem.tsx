import type { FC } from 'react';
import { useEffect, useState } from 'react';

import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import { getMediaType } from '../../../../utils/get_media_type';
import { Icon } from '../../../foundation/Icon';
import { Image } from '../../../foundation/Image';

import * as styles from './MediaItem.styles';
import { loadThumbnail } from './loadThumbnail';

type Props = {
  file: MediaFileFragmentResponse;
};

export const MediaItem: FC<Props> = ({ file }) => {
  const [imageSrc, setImageSrc] = useState<string>();
  const mediaType = getMediaType(file.filename);

  useEffect(() => {
    if (mediaType === 'image') {
      return setImageSrc(file.filename);
    }
    // console.log("media:", mediaType, file.filename)
    if (mediaType === 'video') {
      const filename = file.filename
      return setImageSrc(filename.substring(0, filename.length - 4) + ".jpg");
    }
    loadThumbnail(file.filename).then((url) => setImageSrc(url));
  }, [file.filename, mediaType]);

  if (imageSrc === undefined) {
    return null;
  }

  const conv_tiny_image_filename = (fn: string) => {
    return fn.substring(0, fn.length - 4) + "-t.jpg"
  }

  return (
    <div className={styles.container()}>
      <Image fill src={conv_tiny_image_filename(imageSrc)} />
      {mediaType === 'video' && (
        <div className={styles.playIcon()}>
          <Icon color="#ffffff" height={16} type="FaPlay" width={16} />
        </div>
      )}
    </div>
  );
};
