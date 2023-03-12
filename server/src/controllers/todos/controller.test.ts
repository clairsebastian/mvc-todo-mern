import { expect, describe, it, jest } from '@jest/globals'
import { Response, Request } from 'express'
import { addTodo, getTodos } from "./controller"
import Todo from '../../models/todo'
import { ITodo } from '../../types/todo'

describe('getTodos', () => {
  
    it('should get todos from the repository', async () => {
        const expectedTodos = [{ name: "Clair", description: "Send Email", status: false }] as ITodo[];
        const mockFind = jest.spyOn(Todo, 'find').mockResolvedValue(expectedTodos);

        const req = { method: "GET" } as Request
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response
        await getTodos(req, res);
        
        expect(mockFind).toBeCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({todos: expectedTodos });
    })
})

describe('addTodo', () => {
    it('should call save.todos and and return todos from Todo.find() method', async () => {
        const todo = { name: "Clair", description: "Send Email", status: false } as ITodo;

        const mockSave = jest.spyOn(Todo.prototype, 'save').mockResolvedValue(todo);
        const mockFind = jest.spyOn(Todo, 'find').mockResolvedValue([todo]);
        const req = { method: "POST", body: todo } as Request
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response
        await addTodo(req, res);
        
        expect(mockSave).toHaveBeenCalled();
        expect(mockFind).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Todo added', todo: todo, todos: [todo] });
    })
})