import React from 'react'
import { Container, Button } from 'react-bootstrap'
import './hero.css'
import ModalComponant from '../Modal/ModalComponant'

function Hero() {
    return (
        <article>
            <Container>
                <h2>
                    Learn driving and traffic rules to be better driver.
                </h2>
                <h4>
                    enroll today for best driving lessons
                </h4>
                {/* for register */}
                <ModalComponant text='Register' isSignUpFlow={true} />
                {/* for Login */}
                <ModalComponant text='Login' isSignUpFlow={false} />
            </Container>
        </article >
    )
}

export default Hero