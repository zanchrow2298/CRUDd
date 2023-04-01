import React, { useState, useEffect } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function GetAllData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5045/api/Books")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const updatedata = (data) => {
    
    let { id, bookName, price, category, author  } = data;
    localStorage.setItem('id', id);
    localStorage.setItem('bookName', bookName);
    localStorage.setItem('price', price);
    localStorage.setItem('category', category)
    localStorage.setItem('author', author)
}

  const handleDelete = (id) => {
    fetch(`http://localhost:5045/api/Books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Book successfully deleted
          setData(data.filter((book) => book.id !== id));
        } else {
          throw new Error("Failed to delete book");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  const MyTable = () => (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Book Name</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell>Author</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((item, index) => (
          <Table.Row key={index}>
            <Table.Cell>{item.bookName}</Table.Cell>
            <Table.Cell>{item.price}</Table.Cell>
            <Table.Cell>{item.category}</Table.Cell>
            <Table.Cell>{item.author}</Table.Cell>
            <Link to="/update">
              <Table.Cell>
              <Button onClick={() => updatedata(item)}>Update</Button>
              </Table.Cell>
            </Link>
            <Table.Cell>
              <Button onClick={() => handleDelete(item.id)}>Delete</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );

  return <MyTable />;
}
