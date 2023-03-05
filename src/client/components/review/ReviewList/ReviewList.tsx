import { stringify } from 'querystring';
import type { FC } from 'react';

import type { ReviewFragmentResponse } from '../../../graphql/fragments';
import { AspectRatio } from '../../foundation/AspectRatio';
import { Image } from '../../foundation/Image';

import * as styles from './ReviewList.styles';

type Props = {
  reviews: ReviewFragmentResponse[];
};

export const ReviewList: FC<Props> = ({ reviews }) => {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <ul className={styles.itemList()}>
      {reviews.map((review) => {

        const formatDate = (t: string) => {
          const digit2 = (v: number) => {
            if (v < 10) {
              return "0" + v.toString()
            }
            return v.toString()
          }
          const d = new Date(t)
          return d.getFullYear() + "/" + digit2(d.getMonth()) + "/" + digit2(d.getDate()) + " " + digit2(d.getHours()) + ":" + digit2(d.getMinutes()) + ":" + digit2(d.getSeconds())
        }
        const endTime = formatDate(review.postedAt)

        const conv_tiny_image_filename = (fn: string) => {
          return fn.substring(0, fn.length - 4) + "-a.webp"
        }

        return (
          <li key={review.id} className={styles.item()} data-testid="review-list-item">
            <div className={styles.avaterImage()}>
              <AspectRatio ratioHeight={1} ratioWidth={1}>
                <Image height={52} src={conv_tiny_image_filename(review.user.profile.avatar.filename)} width={52} />
              </AspectRatio>
            </div>
            <div className={styles.content()}>
              <time className={styles.time()}>{endTime}</time>
              <p className={styles.comment()}>{review.comment}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
