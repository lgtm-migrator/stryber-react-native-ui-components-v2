import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const TOOLTIP_TRIANGLE_HEIGHT = 9;

const TooltipIcon: React.FC<SvgProps> = ({fill, ...rest}) => (
  <Svg {...rest}>
    <Path
      d="M14.0711 0.485289C14.962 0.485289 15.4081 1.56243 14.7782 2.1924L8.70711 8.26347C8.31658 8.654 7.68342 8.654 7.29289 8.26347L1.22183 2.1924C0.591867 1.56243 1.03803 0.485289 1.92894 0.485289L14.0711 0.485289Z"
      fill={fill}
    />
  </Svg>
);

TooltipIcon.defaultProps = {
  width: 16,
  height: TOOLTIP_TRIANGLE_HEIGHT,
  fill: 'white',
};

export default TooltipIcon;
