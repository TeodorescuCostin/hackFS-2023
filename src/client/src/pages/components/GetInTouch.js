import React from 'react'
import {  
    Button,
    Stack,
} from '@mui/material'
import Title from './Title'
import Paragraph from './Paragraph'
import { Link } from 'react-router-dom'

const GetInTouch = () => {

    return (
        <Stack 
        component='section'
        direction="column"
        justifyContent= 'center'
        alignItems='center'
        sx={{
            py: 10,
            mx: 6,
        }}
        >
            <Title 
            text={
                'Get in our community'
                } 
            textAlign={'center'}
            />
            <Paragraph 
            text={
                "Join our decentralized ecosystem today and embark on a journey of collaboration, \
                innovation, and limitless potential. Together,let's redefine what's possible and \
                pave the way for a future driven by research, knowledge, and transformative partnerships."
            }
            maxWidth = {'sm'}
            mx={0}
            textAlign={'center'}
            />
            <Button component={Link} 
            to={'/signin'}
            variant="contained" 
            type="submit"
            size="medium"
            sx= {{ 
                fontSize: '0.9rem',
                textTransform: 'capitalize', 
                py: 2,
                px: 4,
                mt: 3, 
                mb: 2,
                borderRadius: 2,
                backgroundColor: '#0066FF',
                "&:hover": {
                    backgroundColor: '#3586ff',
                }
            }}
            >
                Sign In
            </Button>
 
        </Stack>
    )
}

export default GetInTouch;