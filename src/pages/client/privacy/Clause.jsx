import React from 'react';
import { Container, Typography } from '@mui/material';

export default function Clause() {
    return (
        <Container>
            <div style={{ width: '90%', backgroundColor: 'white', padding: '10px', margin: '10px' }}>
                <Typography textAlign={'center'} variant='h3'>
                    ĐIỀU KHOẢN SỬ DỤNG
                </Typography>

                <Typography textAlign={'justify'} variant='body1' >
                    Chào mừng quý khách đến mua sắm tại FAHASA. Sau khi truy cập vào website FAHASA để tham khảo hoặc mua sắm, quý khách đã đồng ý tuân thủ và ràng buộc với những quy định của FAHASA. Vui lòng xem kỹ các quy định và hợp tác với chúng tôi để xây dựng một website FAHASA ngày càng thân thiện và phục vụ tốt những yêu cầu của chính quý khách. Ngoài ra, nếu có bất cứ câu hỏi nào về những thỏa thuận dưới đây, vui lòng liên hệ với FAHASA theo số điện thoại hotline 1900636467 hoặc email qua địa chỉ cskh@fahasa.com.vn.
                </Typography>

                <Typography variant='h4' sx={{ marginTop: 4 }}>
                    Tài khoản của khách hàng
                </Typography>

                <Typography textAlign={'justify'} variant='body1' >
                    Một số dịch vụ, tính năng tại đây yêu cầu quý khách cần phải đăng ký Tài khoản FAHASA để sử dụng. Khi đăng ký, quý khách cần cung cấp các thông tin cá nhân như họ tên, địa chỉ email, số điện thoại,...
                    <br /><br />
                    Khi quý khách đăng ký tài khoản FAHASA thông qua Facebook hoặc Google, thông tin cá nhân như họ tên, email, số điện thoại, ảnh đại diện sẽ được gửi đến FAHASA theo chính sách của nền tảng.
                    <br /><br />
                    Quý khách có trách nhiệm giữ kín mật khẩu và tài khoản, chịu trách nhiệm với tất cả hoạt động diễn ra dưới tài khoản của mình. Nếu có sai sót trong thông tin hoặc quên đăng xuất, FAHASA sẽ không chịu trách nhiệm về tổn thất có thể xảy ra.
                </Typography>

                <Typography variant='h4' sx={{ marginTop: 4 }}>
                    Quyền lợi bảo mật dữ liệu cá nhân của khách hàng
                </Typography>

                <Typography textAlign={'justify'} variant='body1' >
                    FAHASA cam kết bảo mật dữ liệu cá nhân của quý khách và chỉ sử dụng để nâng cao chất lượng dịch vụ. Chúng tôi không chuyển giao dữ liệu cá nhân cho bên thứ ba vì mục đích thương mại. Quý khách có thể yêu cầu rút lại sự đồng ý, chỉnh sửa hoặc xóa dữ liệu của mình thông qua hệ thống website hoặc liên hệ FAHASA qua hotline hoặc email.
                </Typography>

                <Typography variant='h4' sx={{ marginTop: 4 }}>
                    Trách nhiệm của khách hàng khi sử dụng dịch vụ của FAHASA
                </Typography>

                <Typography textAlign={'justify'} variant='body1' >
                    Quý khách không được phép xâm nhập bất hợp pháp vào hệ thống của FAHASA hoặc thay đổi dữ liệu của trang web. Quý khách không được đăng tải nội dung xúc phạm, kích động chính trị, kỳ thị tôn giáo, giới tính hoặc sắc tộc. Nghiêm cấm giả danh người khác hoặc Ban Quản Trị FAHASA.
                </Typography>

                <Typography variant='h4' sx={{ marginTop: 4 }}>
                    Trách nhiệm và quyền lợi của FAHASA
                </Typography>

                <Typography textAlign={'justify'} variant='body1' >
                    FAHASA chịu trách nhiệm tuân thủ các nguyên tắc về xử lý dữ liệu cá nhân theo đúng quy định pháp luật. Chúng tôi không cho phép tổ chức hoặc cá nhân quảng bá sản phẩm trên website FAHASA khi chưa có sự đồng ý bằng văn bản.
                    <br /><br />
                    Điều khoản sử dụng có thể thay đổi bất cứ lúc nào nhưng sẽ được thông báo trên website FAHASA.
                </Typography>

                <Typography variant='h4' sx={{ marginTop: 4 }}>
                    Hiệu lực
                </Typography>

                <Typography textAlign={'justify'} variant='body1' >
                    Điều khoản sử dụng này có hiệu lực từ ngày 01/06/2024. Việc khách hàng tiếp tục sử dụng dịch vụ FAHASA đồng nghĩa với việc chấp thuận các điều khoản đã được điều chỉnh.
                </Typography>
            </div>
        </Container>
    );
}
