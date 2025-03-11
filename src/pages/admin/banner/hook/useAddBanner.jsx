import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from 'components/notification/CustomToast';
import { getAllBanner } from '../services/banner.api';

export default function useAddBanner() {
    const [Banner, setBanner] = useState([]);
    const [stateComponent, setStateComponent] = useState({
        modal: false,
        loading: false,
        modalAdd: false,
        modalDelete: false,
        loadingConfirm: false
    });
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
        getAllBanner({
            ...(type && { type }),
            page: 1,
            limit: 5
        })
            .then((response) => {
                if (response.err === 0) {
                    setBanner(response?.data?.rows);
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

    return { formik, Banner };
}
