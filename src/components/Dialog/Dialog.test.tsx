import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Dialog from '.';

it('should be rendered with title, text and buttons if opened', () => {
  const title = 'Test dialog';
  const text = 'Content here';
  const successButton = 'Fine';
  const cancelButton = 'No';
  const {getByText} = render(
    <Dialog
      title={title}
      text={text}
      onCancel={() => {}}
      onSuccess={() => {}}
      successButtonText={successButton}
      cancelButtonText={cancelButton}
      open={true}
    />,
  );
  expect(getByText(title)).toBeTruthy();
  expect(getByText(text)).toBeTruthy();
  expect(getByText(successButton)).toBeTruthy();
  expect(getByText(cancelButton)).toBeTruthy();
});

it("shouldn't render Dialog if closed", () => {
  const title = 'Test dialog';
  const {getByText} = render(
    <Dialog
      title={title}
      onCancel={() => {}}
      onSuccess={() => {}}
      open={false}
    />,
  );
  expect(() => getByText(title)).toThrowError();
});

it('should fire success and cancel functions on buttons press', () => {
  const onSuccess = jest.fn();
  const onCancel = jest.fn();
  const successBtnText = 'Success';
  const cancelBtnText = 'Cancel';
  const {getByText} = render(
    <Dialog
      onCancel={onCancel}
      onSuccess={onSuccess}
      successButtonText={successBtnText}
      cancelButtonText={cancelBtnText}
      open={true}
    />,
  );
  fireEvent.press(getByText(successBtnText));
  expect(onSuccess).toHaveBeenCalled();
  fireEvent.press(getByText(cancelBtnText));
  expect(onCancel).toHaveBeenCalled();
});
