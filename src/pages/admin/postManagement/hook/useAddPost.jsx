import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup';
import { GetAllArticles } from '../services/Post.api';
import { title } from 'process';

export default function useAddPost() {
    const [posts, setPosts] = useState([]);
    const [stateComponent, setStateComponent] = useState({
        modal: false,
        loading: false
    });
    const [selectedPost, setSelectedPost] = useState(null);
    // Toggle loading
    const handleToggleLoading = useCallback(() => {
        setStateComponent((prev) => ({
            ...prev,
            loading: !prev.loading
        }));
    }, []);
    // Lấy danh sách sách từ API
    const handleListTable = useCallback((type) => {
        handleToggleLoading();
        GetAllArticles({
            ...(type && { type }),
            page: 1,
            limit: 5
        })
            .then((response) => {
                if (response.err === 0) {
                    setPosts(response?.data?.rows);
                } else {
                    showToast(response.mess, 'error');
                }
            })
            .catch((error) => {
                console.error('Lỗi đăng ký:', error);
                showToast('Có lỗi xảy ra: ' + error, 'error');
            })
            .finally(() => {
                handleToggleLoading();
            });
    }, []);
    const handleSearchTable = useCallback((value) => {
        handleListTable(value);
    }, []);
    useEffect(() => {
        handleSearchTable();
    }, []);
    const handleSubmitForm = useCallback(async (values) => {
        console.log('Dữ liệu gửi lên:', values);
        showToast('Thêm sách thành công!', 'success');
    }, []);
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
