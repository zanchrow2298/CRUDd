import React, {useState} from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react'

export default function Create(){
    const [bookName, setBookName] = useState('');
    const [price, setPrice]= useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');

    const postData = () => {
      fetch('http://localhost:5045/api/Books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookName,
          price,
          category,
          author
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Not Ok!');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data);
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
    <Button onClick={postData} type='submit'>Submit</Button>
  </Form>
    )
    

}

