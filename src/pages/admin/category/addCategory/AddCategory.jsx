import React from 'react';
import * as Yup from 'yup';
import CommonFormWithImages from 'components/form/CommonFormWithImages';

export default function AddCategory({ handleToggleModal, handleSubmit }) {
  const initialValues = {
    type: '',
    images: []
  };

  const formFields = [{ name: 'type', label: 'Tên danh mục' }];

  const validationSchema = Yup.object().shape({
    type: Yup.string().required('Tên danh mục là bắt buộc'),
    images: Yup.array()
      .min(1, 'Vui lòng chọn ít nhất một ảnh')
      .test('fileType', 'Chỉ chấp nhận định dạng JPG, PNG, JPEG', (files) => {
        if (!files || files.length === 0) return false;
        return files.every((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type));
      })
  });

  return (
    <CommonFormWithImages
      title="Thông tin danh mục"
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
      handleCancel={handleToggleModal}
    />
  );
}
