import {createUseStyles} from '../../Theme';
import {IBaseInputLayoutProps, IInputSize} from './index';

const inputConstants = {
  OUTLINE_SIZE: 8,
  BORDER_WIDTH: 1,
};

export default createUseStyles(
  (theme, inputSize: IInputSize, color: IBaseInputLayoutProps['color']) => ({
    baseInput: {
      borderWidth: inputConstants.BORDER_WIDTH,
      borderColor: theme.default.main,
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: theme.background.main,
      elevation: 4,
      shadowColor: 'transparent',
      zIndex: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    noLabel: {
      paddingVertical: 12.5,
    },
    baseInputFocused: {
      borderColor: theme[color!].main,
    },
    label: {
      color: theme.text.secondary,
    },
    focusedOutline: {
      position: 'absolute',
      width: inputSize.width + inputConstants.OUTLINE_SIZE,
      height: inputSize.height + inputConstants.OUTLINE_SIZE,
      backgroundColor: theme[color!].light,
      borderRadius: 4,
      left: -4,
      top: -4,
      zIndex: -3,
    },
    error: {
      borderColor: theme.error.main,
    },
    errorFocusedOutline: {
      backgroundColor: theme.error.light,
    },
    disabled: {
      backgroundColor: theme.background.disabled,
    },
    disabledLabel: {
      color: theme.text.disabled,
    },
    mainContent: {
      alignSelf: 'flex-start',
      flex: 1,
    },
  }),
);
