import Head from 'next/head'
import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../styles/Home.module.css'

const url = "http://localhost:3000/api/task";

export default function Home() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(url);
      const taksData = data.data
      setTasks(taksData);
    })();
  }, []);

  const [task, setTask] = useState({ task: "" });

  const handleChange = ({ currentTarget: input }) => {
    input.value === ""
      ? setTask({ task: "" })
      : setTask((prev) => ({ ...prev, task: input.value }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      if (task._id) {
        const { data } = await axios.put(url + "/" + task._id, {
          task: task.task,
        });
        const originalTasks = [...tasks];
        const index = originalTasks.findIndex((t) => t._id === task._id);
        originalTasks[index] = data.data;
        setTasks(originalTasks);
        setTask({ task: "" });
        console.log(data.message);
      } else {
        const { data } = await axios.post(url, task);
        console.log('tasks in add time', tasks)
        setTasks((prev) => [...prev, data.data]);
        setTask({ task: "" });
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (id) => {
    const currentTask = tasks.filter((task) => task._id === id);
    setTask(currentTask[0]);
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(url + "/" + id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title> My todo list</title>
      </Head>
      <main className={styles.main}>
        <h1>Todo List</h1>
        <div>
          <form onSubmit={addTask}>
            <input
              type="text"
              placeholder="Enter task"
              onChange={handleChange}
              value={task.task}
            />  &nbsp;&nbsp;&nbsp;
            <Button type="submit" variant="outline-success">
              {task._id ? "Update" : "Add"}
            </Button>
          </form>
          <br /><br />
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Task</th>
                <th> Action</th>
              </tr>
            </thead>
            {console.log('TASK', tasks)}
            <tbody>
              {tasks.length > 0 ? (
                tasks.map(task => {
                  return (
                    <tr key={task._id}>
                      <td>{task.task}</td>
                      <td>
                        <Button variant="secondary" onClick={() => deleteTask(task._id)}>Delete</Button> &nbsp;
                        <Button variant="light" onClick={() => editTask(task._id)}>Edit</Button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={4}>No task </td>
                </tr>
              )
              }
            </tbody>
          </Table>
        </div>
      </main>
    </div>
  );
}
