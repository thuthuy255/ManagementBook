import { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from 'components/notification/CustomToast';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { getDetailBannerQuery } from '../services/banner.query';
import { convertUrlsToFiles } from 'utils/fileUtils';
import { updateBanner } from '../services/banner.api';
import { useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';

export default function useUpdateBanner() {
  // const { name } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const active = searchParams.get('active');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: dataBanner, isLoading: isFetchingBanner } = getDetailBannerQuery({ params: { name, active: active } });

  const convertFiles = useCallback(async () => {
    const banner = dataBanner?.data?.rows[0]?.img;
    const imageFiles = banner ? await convertUrlsToFiles([banner]) : [];
    formik.setFieldValue('img', imageFiles);
  }, [dataBanner]);

  /** ✅ Submit form */
  const handleSubmitForm = useCallback(
    async (values) => {
      if (!values.bannerID) {
        showToast('Không tìm thấy banner để cập nhật', 'error');
        return;
      }
      console.log('🚀 ~ values:', values);
      const formData = new FormData();
      formData.append('bannerID', values.bannerID.toString());
      formData.append('name', values.name);
      formData.append('active', values.active);

      values.img.forEach((file) => formData.append('img', file));

      dispatch(showLoading());
      try {
        const response = await updateBanner(formData);

        if (response?.err === 0) {
          showToast(response.mess, 'success');
          queryClient.invalidateQueries({ queryKey: ['getAllBannerQuery'] });
          navigate('/banner-management');
        } else {
          showToast(response.mess, 'warning');
        }
      } catch (error) {
        console.error('Lỗi cập nhật banner:', error);
        showToast('Có lỗi xảy ra', 'error');
      } finally {
        dispatch(hideLoading());
      }
    },
    [dispatch, queryClient, navigate]
  );

  useEffect(() => {
    if (dataBanner) {
      convertFiles();
    }
  }, [dataBanner]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bannerID: dataBanner?.data?.rows[0]?.id || '',
      name: dataBanner?.data?.rows[0]?.name || '',
      active: dataBanner?.data?.rows[0]?.active || '1',
      img: []
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên banner không được để trống'),
      active: Yup.string().required('Trạng thái không được để trống'),
      img: Yup.array().min(1, 'Ảnh banner là bắt buộc')
    }),
    onSubmit: handleSubmitForm
  });

  return { formik, isFetchingBanner };
}
