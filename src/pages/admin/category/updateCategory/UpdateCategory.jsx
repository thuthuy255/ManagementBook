import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import CommonFormWithImages from 'components/form/CommonFormWithImages';
import { createCategory, updateCategory } from '../services/category.api';
import { convertImageUrlsToFiles } from 'utils/fileUtils';

export default function UpdateCategory({ selectedBook, handleToggleModalBook, handleSubmit }) {
  console.log(selectedBook);
  const [initialValues, setInitialValues] = useState({
    type: selectedBook.type || '',
    images: [],
    id: selectedBook.id
  });
  console.log(initialValues);
  const loadImageFile = useCallback(async () => {
    const imageFiles = await convertImageUrlsToFiles(selectedBook.img);
    setInitialValues((prev) => ({ ...prev, images: imageFiles }));
  });

  useEffect(() => {
    if (selectedBook?.img) loadImageFile();
  }, [selectedBook]);

  const formFields = [{ name: 'type', label: 'Tên danh mục' }];

  const validationSchema = Yup.object().shape({
    id: Yup.string().required('Id không tồn tại'),
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
      handleCancel={handleToggleModalBook}
    />
  );
}
