import React from 'react'
import { Box, Button, styled, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
//img
import headerImg from '../../resources/illustration-intro.png';

const Hero = () => {

    const CustomBox = styled(Box) (({ theme }) => ({
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        // tamanhos
        gap: theme.spacing(2),
        paddingTop: theme.spacing(10),
        // cor de fundo
        backgroundColor: 'white',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        }
    }));

    const BoxText = styled(Box) (({ theme }) => ({
        flex: '1',
        paddingLeft: theme.spacing(8),
        [theme.breakpoints.down('md')]: {
            flex: '2',
            textAlign: 'center',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    }));


  return  (
        <CustomBox component='header'>
            {/*  Box text  */}
            <BoxText 
            component='section'
            >
                <Typography
                variant='h2'
                component= 'h1'
                sx={{
                    fontWeight: 700,
                    color: '#0066FF',
                }}
                >
                    The Innovation Linker

                </Typography>

                <Typography
                variant='p'
                component='p'
                sx={{
                    py: 3,
                    lineHeight: 1.6,
                    color: '#0066FF',
                }}
                >
                    Unlocking the Power of Collaboration, where Companies and Researchers Converge to Shape the Future of Innovation
                </Typography>

                <Box>
                    <Button 
                    component={Link} 
                    to={'/signIn'}
                    variant='contained'
                    sx={{
                        mr: 2,
                        px: 4, 
                        py: 1,
                        fontSize: '0.9rem',
                        textTransform: 'capitalize',
                        borderRadius: 2,
                        borderColor: '#0066FF',
                        color: '#fff',
                        backgroundColor: '#0066FF',
                        "&&:hover": {
                            backgroundColor: "#3586ff"
                        },
                        "&&:focus": {
                            backgroundColor: "#3586ff"
                        }
                    }}
                    >
                        Sign In
                    </Button>
                    <Button 
                    component={Link} 
                    to={'/signIn'}
                    variant='outlined'
                    sx={{
                        px: 4, 
                        py: 1,
                        fontSize:'0.9rem',
                        textTransform: 'capitalize',
                        borderRadius: 2,
                        color: '#0066FF',
                        backgroundColor: 'transparent',
                        borderColor: '#0066FF',
                        "&&:hover": {
                            color: '#0066FF',
                            borderColor: '#0066FF',
                        },
                        "&&:focus": {
                            color: '#0066FF',
                            borderColor: '#0066FF',
                        }
                    }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </BoxText>

            <Box sx={theme => ({
                [theme.breakpoints.down('md')]:{
                    flex: '1',
                    paddingTop: '30px',
                    alignSelf: 'center',
                },
                [theme.breakpoints.up('md')]:{
                    flex: '2',
                    alignSelf: 'flex-end',
                },
            })}
            >
                <img
                src={headerImg}
                alt="headerImg"
                style={{ 
                    width: "70%", 
                    marginLeft: 200,
                    marginBottom: 200,
                }}
                />
            </Box>

        </CustomBox>
    )
}

export default Hero