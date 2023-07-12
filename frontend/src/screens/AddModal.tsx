import React from 'react'
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { addToDo } from "../utils/handleAPI";

import {  useSelector } from "react-redux";

const schema = z.object({
  description: z.string().min(3, { message: "Description at least 3 char" }).max(200),
  title: z.string().min(3, { message: "Title at least 3 char" }).max(50),
  //created_at: z.string().min(3, { message: "Created at least 3 char" }).max(50),
  deadline: z.string().min(3, { message: "Deadline at least 3 char" }).max(50),
});

type ExpenseFormData = z.infer<typeof schema>;

interface FormData {
  id: number;
  title: string;
  created_at: string;
  deadline: string;
  description: string;
  category: string;
}

interface Props {
  show: boolean;
  toDo: FormData[];
  setToDo: Function;
  selectedCategory: string;
  onClick: () => void;
}

const AddModal = ({ show, toDo, setToDo, selectedCategory, onClick }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    data["category"] = selectedCategory;
    console.log(data);
   // setToDo([...toDo, { ...data, id: toDo.length + 1 }])
    addToDo(data["title"], data["description"], data["deadline"], data["category"], setToDo)
    onClick();
  };

  return (
   
    <>
      <Modal show={show} onHide={onClick}>
        <Modal.Header closeButton>
          <Modal.Title>Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              reset();
            })}
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                {...register("title", { required: true, minLength: 3 })}
                id="title"
                type="text"
                className="form-control"
              />
              {errors.title?.type === "required" && (
                <p className="text-danger">The name field is required</p>
              )}
              {errors.title?.type === "minLength" && (
                <p className="text-danger">
                  The name must be at least 3 character
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                {...register("description")}
                id="description"
                type="text"
                className="form-control"
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="created_at" className="form-label">
                Created at
              </label>
              <input
                {...register("created_at")}
                id="created_at"
                type="text"
                className="form-control"
              />
            </div> */}
            <div className="mb-3">
              <label htmlFor="deadline" className="form-label">
                Deadline
              </label>
              <input
                {...register("deadline")}
                id="deadline"
                type="datetime-local"
                className="form-control"
              />
              
   
    
            </div>
            <button
              disabled={!isValid}
              className="btn btn-primary" 
              type="submit"
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddModal;
