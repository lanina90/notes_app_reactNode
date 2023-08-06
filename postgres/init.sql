CREATE DATABASE test;

\c test

CREATE TABLE user_notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  created VARCHAR(255) NOT NULL,
  dates VARCHAR(255),
  archived BOOLEAN DEFAULT false
);

INSERT INTO user_notes (title, created, content, category, dates, archived) VALUES
    ('Shopping list', 'June 21, 2023', 'Bread, cucumbers, salt', 'Task', null, true),
    ('The theory of evolution', 'June 2112, 2023', 'The evolution theory', 'Random Thought', null, false),
    ('New feature', 'June 20, 2023', 'Implement new feature for app before 18/07/2023', 'Idea', null, false),
    ('Workout routine', 'July 21, 2023', '1. Pushups 2. Situps 3. Squats', 'Task', '2023-07-20, 2023-07-24', false),
    ('Inspirational Quote', 'July 11, 2023', 'The most important step is always the next one.', 'Quote', null, false),
    ('Grocery shopping', 'August 1, 2023', 'Milk, Eggs, Bread, Fruits', 'Task', '2023-07-29', false),
    ('Car service', 'June 21, 2023', 'Need to service the car', 'Task', '2023-08-01', false);

