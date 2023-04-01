import React, {useState, useEffect } from "react";
import { Button, Form } from 'semantic-ui-react'

export default function Update(){
  const [bookName, setBookName] = useState('');
  const [price, setPrice]= useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [id, setID] = useState(null);

  useEffect(() => {
    const storedID = localStorage.getItem('id');
    setID(storedID);
    setBookName(localStorage.getItem('bookName') || '');
    setCategory(localStorage.getItem('category') || '');
    setAuthor(localStorage.getItem('author') || '');
    setPrice(localStorage.getItem('price') || '');
  }, []);

  const postData = () => {
    const data = {
      bookName,
      price,
      category,
      author,
    };

    fetch(`http://localhost:5045/api/Books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network not Ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data was successfully updated:', data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <Form>
      <Form.Group unstackable widths={2}>
        <Form.Input label='BookName' placeholder='Book Name' value={bookName} onChange={(e) => setBookName(e.target.value)} />
        <Form.Input label='Price' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)}/>
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='Category' placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)}/>
        <Form.Input label='Author' placeholder='Author' value={author} onChange={(e) => setAuthor(e.target.value)} />
      </Form.Group>
      <Button onClick={postData} type='submit'>Update</Button>
    </Form>
  );
}
