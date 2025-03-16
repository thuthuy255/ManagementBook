import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from 'components/notification/CustomToast';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { getAllBanner, updateBanner } from '../services/banner.api';
export default function useUpdateBanner() {
    const [loading, setLoading] = useState(false);
    const { name } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bannerData, setBannerData] = useState([]);
    const handleGetDetailBanner = async () => {
        try {
            const params = {
                name: name
            }
            const response = await getAllBanner(params);
            if (response && response?.err === 0) {
                console.log("pharn hoi", response)
                setBannerData(response?.data?.rows[0]);
            }
        } catch (error) {
            console.error('Lỗi lấy chi tiết banner', error);
        }
    }

    useEffect(() => {
        handleGetDetailBanner();
    }, [name])
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
        enableReinitialize: true,
        initialValues: {
            name: bannerData?.name || '',
            active: bannerData?.active || 1,
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
