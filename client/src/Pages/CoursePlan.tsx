import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Card, Container, } from 'react-bootstrap'
import './css/pricing.css'

function CoursePlan() {
    const products = ['Basic', 'Standard', 'Pro', 'Expert']
    const [prices, setPrice] = useState([])

    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        const { data: response } = await axios.get("http://localhost:4400/subs/prices");
        setPrice(response.data)
    }

    const createSession = async (priceId: string) => {
        const { data: response } = await axios.post("http://localhost:4400/subs/session",
            {
                priceId
            });

        window.location.href = response.url;
    }

    return (
        <Container className='card-container'>

            <Container className='child'>
                {prices.map((price: any) => {
                    return (
                        <Card className='product-price' style={{ width: '10rem' }}>
                            <Card.Header>
                                <h1><span>&#8377;</span>{price.unit_amount / 100}</h1>
                            </Card.Header>
                            <Card.Body>
                                <p>Product name</p>
                                <Button onClick={() => createSession(price.id)}>
                                    Buy Now
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </Container>
        </Container >
    )
}

export default CoursePlan