import React, { useState } from "react";
import {
    TextField, Button, Grid, Typography, InputLabel, FormControl,
    Dialog,
    DialogContent,
    DialogActions,
    IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router";
import { DropzoneArea } from "mui-file-dropzone";
import axios from "axios";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const AddProductForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "", price: "", description: "", author: "", publisher: "", qty: "",
        images: [], imagePreviews: [], showDropzone: false
    });

    const [errors, setErrors] = useState({}); // Lưu lỗi từng field

    // Kiểm tra hợp lệ dữ liệu nhập
    const validate = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Tên sản phẩm không được để trống.";
        if (!formData.author.trim()) tempErrors.author = "Tác giả không được để trống.";
        if (!formData.publisher.trim()) tempErrors.publisher = "Nhà xuất bản không được để trống.";
        if (!formData.description.trim()) tempErrors.description = "Mô tả không được để trống.";
        if (!formData.price || formData.price <= 0) tempErrors.price = "Giá phải là số dương.";
        if (!formData.qty || formData.qty <= 0) tempErrors.qty = "Số lượng phải là số dương.";
        if (formData.images.length === 0) tempErrors.images = "Vui lòng chọn ít nhất một ảnh.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };
    const [openImage, setOpenImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleOpenImage = (image) => {
        setSelectedImage(image);
        setOpenImage(true);
    };

    const handleCloseImage = () => {
        setOpenImage(false);
        setSelectedImage(null);
    };

    // Xử lý nhập liệu
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    // Xử lý chọn ảnh
    const handleFileChange = (files) => {
        if (files.length) {
            const newImages = [...formData.images, ...files];
            const newPreviews = newImages.map(file => URL.createObjectURL(file));

            setFormData(prev => ({
                ...prev,
                images: newImages,
                imagePreviews: newPreviews,
                showDropzone: formData.images.length === 0, // Chỉ hiển thị Dropzone nếu chưa có ảnh
            }));

            setErrors(prev => ({ ...prev, images: "" })); // Xóa lỗi nếu có ảnh
        }
    };


    // Xóa ảnh
    const removeImage = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        const newPreviews = formData.imagePreviews.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, images: newImages, imagePreviews: newPreviews }));
    };

    // Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return; // Dừng lại nếu có lỗi

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (!["images", "imagePreviews", "showDropzone"].includes(key)) {
                formDataToSend.append(key, value);
            }
        });
        formData.images.forEach(image => {
            formDataToSend.append("images", image);
        });
    };

    return (
        <div>
            <IconButton >
                <ArrowBackIcon
                    onClick={() => navigate(-1)}
                />
            </IconButton>
            <Typography variant="h5" align="center" gutterBottom>
                Thêm Mới Sản Phẩm
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {[
                        { label: "Tên", name: "name" },
                        { label: "Giá", name: "price", type: "number" },
                        { label: "Tác giả", name: "author" },
                        { label: "Nhà xuất bản", name: "publisher" },
                        { label: "Số lượng", name: "qty", type: "number" },
                    ].map(({ label, name, type = "text" }) => (
                        <Grid item xs={12} sm={6} key={name}>
                            <TextField fullWidth label={label} name={name} type={type}
                                value={formData[name]} onChange={handleChange} required
                                error={!!errors[name]} helperText={errors[name]} />
                        </Grid>
                    ))}

                    {/* Mô tả */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel shrink>Mô tả</InputLabel>
                            <textarea rows={4} placeholder="Nhập mô tả sản phẩm..."
                                name="description" value={formData.description} onChange={handleChange}
                                style={{
                                    width: "100%", padding: "10px", fontSize: "16px",
                                    borderRadius: "5px", borderColor: errors.description ? "red" : "#ccc"
                                }} />
                            {errors.description && <Typography color="error">{errors.description}</Typography>}
                        </FormControl>
                    </Grid>

                    {/* Ảnh sản phẩm */}
                    <Grid item xs={12}>
                        <InputLabel shrink style={{ paddingBottom: "20px" }}>Ảnh sản phẩm</InputLabel>
                        <Grid container spacing={2}>
                            {formData.imagePreviews.map((preview, index) => (
                                <Grid item xs={4} key={index} style={{ position: "relative" }}>
                                    <img src={preview} alt={`Ảnh ${index + 1}`}
                                        style={{ width: "100%", height: "150px", borderRadius: "10px", objectFit: "cover", cursor: "pointer" }}
                                        onClick={() => handleOpenImage(preview)}
                                    />
                                    <Button variant="contained" color="secondary" size="small"
                                        style={{ position: "absolute", top: "5px", right: "5px", fontSize: "12px" }}
                                        onClick={() => removeImage(index)}>Xóa</Button>
                                </Grid>
                            ))}
                        </Grid>
                        <Dialog open={openImage} onClose={handleCloseImage} maxWidth="md">
                            <DialogContent style={{ padding: 0 }}>
                                {selectedImage && (
                                    <img src={selectedImage} alt="Ảnh xem trước"
                                        style={{ width: "100%", height: "auto", maxWidth: "90vw", maxHeight: "90vh" }}
                                    />
                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseImage} color="primary">Đóng</Button>
                            </DialogActions>
                        </Dialog>

                        {/* Dropzone chỉ xuất hiện khi chưa có ảnh */}
                        {formData.images.length === 0 && (
                            <DropzoneArea acceptedFiles={["image/*"]} dropzoneText="Kéo và thả hoặc chọn file ảnh"
                                filesLimit={10} onChange={handleFileChange} showPreviewsInDropzone={false} showAlerts={false} />
                        )}

                        {/* Nút thêm ảnh */}
                        {formData.images.length > 0 && (
                            <Button variant="outlined" component="label">
                                Thêm ảnh
                                <input type="file" hidden accept="image/*" multiple onChange={(e) => handleFileChange(e.target.files)} />
                            </Button>
                        )}

                        {errors.images && <Typography color="error">{errors.images}</Typography>}
                    </Grid>

                    {/* Nút lưu */}
                    <Grid container justifyContent="flex-end" style={{ marginTop: "20px", marginRight: "10px" }}>
                        <Button type="submit" variant="contained" color="primary">
                            Lưu Sản Phẩm
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddProductForm;
