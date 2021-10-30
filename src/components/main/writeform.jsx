import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

function WriteForm({ showWriteForm, createPost, setShowWritetForm }) {
  return (
    <Modal show={showWriteForm} onHide={() => setShowWritetForm(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Post new photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createPost}>
          <Form.Group controlId="formBasicEmail">
            <input type="file" name="img" />
            <Form.Control as="textarea" rows={3} name="desc" />
          </Form.Group>
          <div className="text-right">
            <Button type="submit" size="sm">
              Submit
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="ml-2"
              onClick={() => setShowWritetForm(false)}
            >
              Close
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default WriteForm;
