import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import useStyles from './styles';
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import BaseInputLayout, {IBaseInputLayoutProps} from '../Input/BaseInputLayout';
import {ArrowDownIcon} from '../Icons';
import {useTheme} from '../Theme';
import Text from '../Text';
import {validateInputValueLength} from '../../utils';

export interface IDropdownProps extends IBaseInputLayoutProps {
  value?: string;
  placeholder?: string;
  dropdownStyle?: StyleProp<ViewStyle>;
  onChange?: (open: boolean) => void;
}

export interface IDropdownPosition {
  top: number;
  left: number;
  width: number;
}

export interface IDropdownRef {
  open: (event?: GestureResponderEvent) => void;
  close: () => void;
}

const Dropdown = forwardRef<IDropdownRef, IDropdownProps>(
  (
    {
      placeholder,
      value,
      onPress,
      disabled,
      children,
      dropdownStyle,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const {theme} = useTheme();
    const dropdownInputRef = useRef<View>(null);
    const [visible, setVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<IDropdownPosition>(
      {
        top: 0,
        left: 0,
        width: 0,
      },
    );
    const styles = useStyles(dropdownPosition);

    const handleOpen = (event?: GestureResponderEvent) => {
      dropdownInputRef.current!.measure((x, y, width, height, pageX, pageY) => {
        setDropdownPosition({top: pageY + height, left: pageX, width});
      });
      setVisible(true);
      onChange && onChange(true);
      onPress && onPress(event!);
    };

    const handleClose = () => {
      setVisible(false);
      onChange && onChange(false);
    };

    const renderDropdown = () => (
      <Modal visible={visible} transparent animationType="none">
        <Pressable style={styles.overlay} onPress={handleClose} />
        <View style={[styles.dropdown, dropdownStyle]}>{children}</View>
      </Modal>
    );

    useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose,
    }));

    return (
      <BaseInputLayout
        isFocused={visible}
        ref={dropdownInputRef}
        onPress={handleOpen}
        rightContent={
          <ArrowDownIcon
            fill={disabled ? theme.default.main : theme.default.dark}
            style={[styles.icon, visible && styles.invertedIcon]}
          />
        }
        disabled={disabled}
        {...rest}
      >
        {renderDropdown()}
        <Text
          variant="label"
          style={[
            !!placeholder && styles.placeholderText,
            !!value && styles.valueText,
            disabled && styles.disabledText,
          ]}
        >
          {(!!value && validateInputValueLength(value)) || placeholder}
        </Text>
      </BaseInputLayout>
    );
  },
);

export default Dropdown;
