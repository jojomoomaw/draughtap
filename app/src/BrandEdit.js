import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const BrandEdit = () =>{
    const initialFormState = {
        name: '',
    };
    const [brand, setBrand] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/api/group/${id}`)
                .then(response => response.json())
                .then(data => setBrand(data));
        }
    }, [id, setBrand]);

    const handleChange = (event) => {
        const { name, value } = event.target

        setBrand({ ...brand, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch('/api/brand' + (brand.id ? '/' + brand.id : ''), {
            method: (brand.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(brand)
        });
        setBrand(initialFormState);
        navigate('/brands');
    }

    const title = <h2>{brand.id ? 'Edit Brand' : 'Add Brand'}</h2>;

    return (<div>
        <AppNavbar/>
        <Container>
            {title}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={brand.name || ''}
                         onChange={handleChange} autoComplete="name"/>
                </FormGroup>
            </Form>
        </Container>
    </div>
)
}

export default BrandEdit;