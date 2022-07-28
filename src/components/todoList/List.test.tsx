import { render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";

describe('todoList component test', () => {
  it('list renders', () => {
    render(<TodoList />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
  it("list snapshot", () => {
    const list = render(<TodoList />);
    expect(list).toMatchSnapshot();
  });
})

