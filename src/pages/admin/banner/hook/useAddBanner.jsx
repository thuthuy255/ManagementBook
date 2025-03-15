import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from 'components/notification/CustomToast';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { createBanner } from '../services/banner.api';
export default function useAddBanner() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmitForm = useCallback(
        async (values) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('active', values.active);
            if (Array.isArray(values.img) && values.img.length > 0) {
                values.img.forEach((file) => {
                    formData.append('img', file);
                });
            }
            setLoading(true); // Bật loading
            dispatch(showLoading());
            try {
                const response = await createBanner(formData);
                if (response && response?.err === 0) {
                    showToast(response?.mess, 'success');
                    navigate('/banner-management');
                } else {
                    showToast(response?.mess, 'warning');
                }
            } catch (error) {
                console.error('Đã có lỗi xảy ra', error);
                showToast('Có lỗi xảy ra', 'error');
            } finally {
                dispatch(hideLoading());
            }
        },
        [setLoading, showToast, navigate]
    );
    // Formik config
    const formik = useFormik({
        initialValues: {
            name: '',
            active: '1',
            img: []
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên sản phẩm không được để trống'),
            active: Yup.string().required('Trạng thái không được để trống'),
            img: Yup.array().min(1, 'Ảnh sản phẩm là bắt buộc')
        }),
        onSubmit: handleSubmitForm
    });

    return { formik, loading };
}
