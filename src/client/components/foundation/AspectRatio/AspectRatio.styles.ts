import { css } from '@emotion/css';

export const container = ({ ratioWidth, ratioHeight }: { ratioWidth: number, ratioHeight: number }) => css`
  aspect-ratio: ${ratioWidth} / ${ratioHeight};
  position: relative;
  width: 100%;
`;
