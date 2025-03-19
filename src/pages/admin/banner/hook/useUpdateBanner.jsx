import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from 'components/notification/CustomToast';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { createBanner, getAllBanner, updateBanner } from '../services/banner.api';
import { convertUrlsToFiles } from 'utils/fileUtils';
import { getAllCategory } from 'pages/admin/category/services/category.api';
export default function useUpdateBanner() {
    const [loading, setLoading] = useState(false);
    const { name } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bannerData, setBannerData] = useState([]);
    const handleGetDetailBanner = useCallback(async () => {
        try {
            const params = {
                name: name
            }
            const response = await getAllBanner(params);
            console.log(response)
            if (!response || response?.err !== 0) {  // Chỉ return nếu lỗi
                console.log("Có lỗi xảy ra", response);
                return;
            }
            const currentData = response?.data?.rows?.[0];
            const imageFiles = await convertUrlsToFiles(Array.isArray(currentData.img) ? currentData.img : [currentData.img]);
            const updatedBanner = { ...currentData, img: imageFiles };
            setBannerData(updatedBanner)

        } catch (error) {
            console.error('Đã có lỗi xảy ra', error);
            showToast('Đã có lỗi xảy ra', 'warning');
        } finally {
            dispatch(hideLoading());
        }

    }, [name]);


    useEffect(() => {
        handleGetDetailBanner();
    }, [])
    const statusOptions = [
        { value: "1", label: "Hoạt động" },
        { value: "0", label: "Không hoạt động" }
    ];
    const handleSubmitForm = useCallback(
        async (values) => {
            const formData = new FormData();
            formData.append('bannerID', values.bannerID);
            // formData.append('title', values.title);
            formData.append('name', values.name);
            formData.append('active', values.active);
            if (Array.isArray(values.img_src) && values.img.length > 0) {
                values.img.forEach((file) => {
                    formData.append('img', file);
                });
            }
            dispatch(showLoading());
            try {
                const response = await updateBanner(formData);
                console.log('reponse', response)
                if (response && response?.err === 0) {
                    showToast('Sửa thành công banner', 'success');
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
        [dispatch, showToast, navigate]
    );


    // Formik config
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            bannerID: bannerData?.id || "",
            name: bannerData?.name || '',
            active: bannerData?.active?.toString() || "1",  // Chuyển `active` thành string
            img: bannerData?.img || []
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên sản phẩm không được để trống'),
            active: Yup.string().required('Trạng thái không được để trống'),
            img: Yup.array().min(1, 'Ảnh sản phẩm là bắt buộc')
        }),
        onSubmit: handleSubmitForm
    });

    return { formik, loading, statusOptions };
}
