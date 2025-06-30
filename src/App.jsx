import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiSun, FiMoon, FiCheck } from 'react-icons/fi';
import './App.css';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 다크모드 상태에 따라 배경색 변경
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : '';
  }, [isDarkMode]);

  // Todo 추가
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // Todo 삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Todo 완료 상태 토글
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Enter 키로 Todo 추가
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // 필터링된 Todo 목록
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  // 통계
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className={`app-wrapper ${isDarkMode ? 'dark-card' : 'light-card'}`}>
        {/* 상단 영역 */}
        <div className="filter-section">
          {/* 다크모드 토글 */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`theme-toggle ${isDarkMode ? 'dark-toggle' : 'light-toggle'}`}
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* 필터 버튼 */}
          <div className="filter-wrapper">
            {[
              { key: 'all', label: 'All', count: totalTodos },
              { key: 'active', label: 'Active', count: activeTodos },
              { key: 'completed', label: 'Completed', count: completedTodos }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`filter-button ${
                  filter === key
                    ? 'active-filter'
                    : isDarkMode
                      ? 'dark-filter'
                      : 'light-filter'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Todo 목록 */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p className="empty-text">
                {filter === 'completed'
                  ? '완료 없음'
                  : filter === 'active'
                    ? '진행중 리스트 없음'
                    : '리스트 없음'}
              </p>
            </div>
          ) : (
            <div className="todo-items">
              {filteredTodos.map((todo, index) => (
                <div
                  key={todo.id}
                  className={`todo-item ${
                    isDarkMode ? 'dark-todo-item' : 'light-todo-item'
                  } ${todo.completed ? 'completed' : ''}`}
                >
                  <div className="todo-content">
                    {/* 체크박스 */}
                    <button
                      onClick={() => toggleComplete(todo.id)}
                      className={`checkbox ${
                        todo.completed
                          ? 'checked-box'
                          : isDarkMode
                            ? 'dark-checkbox'
                            : 'light-checkbox'
                      }`}
                    >
                      {todo.completed && <FiCheck size={14} />}
                    </button>

                    {/* Todo 내용 */}
                    <div className="todo-details">
                      <p className={`todo-text ${
                        todo.completed
                          ? 'completed-text'
                          : isDarkMode ? 'dark-text' : 'light-text'
                      }`}>
                        {todo.text}
                      </p>
                    </div>

                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="delete-button"
                      title="삭제"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Todo 입력 */}
          <div className={`input-section`}>
            <div className="input-wrapper">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add Todo"
                className={`todo-input ${isDarkMode ? 'dark-input' : 'light-input'}`}
              />
              <button
                onClick={addTodo}
                className="add-button"
              >
                Add
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
