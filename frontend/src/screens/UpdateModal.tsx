import React from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getAllToDo, updateToDo } from "../utils/handleAPI";

interface obj {
  id: number;
  title: string;
  created_at: string;
  deadline: string;
  description: string;
  category: string;
}

interface Props {
  visible: boolean;
  toDo: obj[];
  setToDo: Function;
  selectedCategory: string;
  onUpdate: () => void;
  ID: string;

  title: string;
  desc: string;
  deadline: string;
}

const UpdateModal = ({
  visible,
  toDo,
  setToDo,
  ID,
  selectedCategory,
  title,
  desc,
  deadline,
  onUpdate,
}: Props) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDescription] = useState(desc);
  const [newDeadline, setNewDeadline] = useState(deadline);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    Submit();
  };

  const Submit = async () => {
    let result = await updateToDo(ID, newTitle, newDesc, newDeadline);
    if (result.status === 200) {
      setToDo((toDo: any) => {
        return toDo.map((item: any) => {
          if (item._id === ID) {
            return {
              ...item,
              title: newTitle,
              description: newDesc,
              deadline: newDeadline,
            };
          }
          return item;
        });
      });
      onUpdate();
    } else {
      alert("Request could not be handled");
      console.log(result);
    }
  };

  return (
    <>
      {/* { toDo.map((e) => e.id === ID && (  */}
      <Modal show={visible} onHide={onUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                // {...register("title", { required: true, minLength: 3 })}
                id="title"
                type="text"
                className="form-control"
                value={newTitle}
                onChange={(i) => setNewTitle(i.target.value)}
              />
              {/* {errors.title?.type === "required" && (
                <p className="text-danger">The name field is required</p>
              )}
              {errors.title?.type === "minLength" && (
                <p className="text-danger">
                  The name must be at least 3 character
                </p>
              )} */}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                // {...register("description")}
                id="description"
                type="text"
                className="form-control"
                value={newDesc}
                onChange={(i) => setNewDescription(i.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deadline" className="form-label">
                Deadline
              </label>
              <input
                // {...register("deadline")}
                id="deadline"
                type="datetime-local"
                className="form-control"
                value={newDeadline}
                onChange={(i) => setNewDeadline(i.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* ))} */}
    </>
  );
};

export default UpdateModal;
