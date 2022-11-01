import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const BrandList = () => {

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/brands')
      .then(response => response.json())
      .then(data => {
        setBrands(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch('/api/brand/${id}', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedBrands = [...brands].filter(i => i.id !== id);
      setBrands(updatedBrands);
    });
  }

  if (loading) {
    return <p>Loading</p>;
  }

  const brandList = brands.map(brand => {
    return <tr key={brand.id}>
        <td style={{whiteSpace: 'nowrap'}}>{brand.name}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/brands/" + brand.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => remove(brand.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
  });

  return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-end">
            <Button color="success" tag={Link} to="/brands/new">Add Brand</Button>
          </div>
          <h3>My Brands</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {brandList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  };

export default BrandList;