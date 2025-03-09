import { Box, Grid } from '@mui/material'
import React from 'react'

export default function Profile() {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <Box p={2} component="img"
                        src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/464101933_1589786078272232_287137893144228374_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeFZ_F4zxmKCgXkHtnzM65KuTZS2vXvykOVNlLa9e_KQ5W3tmi74wWkCOrXbcUjO2U_zMRjbKLnJbDRcQC0AvYom&_nc_ohc=fntF45CyjwoQ7kNvgGAS3oJ&_nc_oc=AdjDVcDqezTvMJC-iPckFI8_oIdle2kd3kIyJL2D8GUiooruud6pGDGffvYfg8TTx9k&_nc_zt=24&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AbrzYHpfX9HXEkl5D1Xz90n&oh=00_AYEx_Qw1bOzv_ic1HnccGEMa8XZOQEhdPwT6edtFMJEGug&oe=67D2F90F"
                        alt="Example"
                        sx={{ width: 150, height: 150 }}>
                    </Box>
                    <h1>Vũ Tiến Khoái </h1>
                </Grid>
                <Grid item md={8}>
                    <Box bgcolor="lightseagreen" p={2}>Cột 2 (6/12)</Box>
                </Grid>
            </Grid>
        </div>
    )
}
