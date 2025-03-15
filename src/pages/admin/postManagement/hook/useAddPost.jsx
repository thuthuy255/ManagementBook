import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup';
import { title } from 'process';
import { useNavigate } from 'react-router';
import { createArticles } from '../services/Post.api';
import { showLoading } from 'features/slices/loading.slice';
import { useDispatch } from 'react-redux';
import { showToast } from 'components/notification/CustomToast';

export default function useAddPost() {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmitForm = useCallback(
        async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            formData.append('type', values.type);
            if (Array.isArray(values.img_src) && values.img_src.length > 0) {
                values.img_src.forEach((file) => {
                    formData.append('img_src', file);
                });
            }
            dispatch(showLoading());
            try {
                const response = await createArticles(formData);
                if (response && response?.err === 0) {
                    showToast(response?.mess, 'success');
                    navigate('/post-management');
                } else {
                    showToast(response?.mess, 'warning');
                }
            } catch (error) {
                console.error('Đã có lỗi xảy ra', error);
                showToast('Có lỗi xảy ra', 'error');
            } finally {
                dispatch(hideLoading());
            }
            submit(); // Gọi hàm async bên trong
        },
        [dispatch, showToast, navigate]
    );
    // Formik config
    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            type: '',
            img_src: []
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Tiêu đề không được để trống'),
            content: Yup.string().required('Nội dung không được để trống'),
            type: Yup.string().required('Loại không được để trống'),
            img_src: Yup.array().min(1, 'Ảnh là bắt buộc')

        }),
        onSubmit: handleSubmitForm
    });
    return { formik, posts };

}
