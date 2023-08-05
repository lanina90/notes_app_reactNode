CREATE DATABASE test;

\c test

CREATE TABLE user_notes (
  id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dates: {
      type: DataTypes.STRING,
      allowNull: true
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
);

INSERT INTO user_notes VALUES ('Shopping list', 'June 21, 2023', 'Bread, cucumbers, salt', 'Task', '', true),
INSERT INTO user_notes VALUES ('The theory of evolution', 'June 29, 2023', 'The evolution theory', 'Random Thought', '', false),
INSERT INTO user_notes VALUES ('New feature', 'July 15, 2023', 'Implement new feature for app before 18/07/2023', 'Idea', '', false),
INSERT INTO user_notes VALUES ('Workout routine', 'July 20, 2023', '1. Pushups 2. Situps 3. Squats', 'Task', '20/07/2023, 24/07/2023', false),
INSERT INTO user_notes VALUES 'Inspirational Quote', 'July 20, 2023', 'The most important step is always the next one.', 'Quote', '', false),
INSERT INTO user_notes VALUES ('Grocery shopping', 'July 23, 2023', 'Milk, Eggs, Bread, Fruits', 'Task', '29/07/2023', false),
INSERT INTO user_notes VALUES ('Car service', 'July 25, 2023', 'Need to service the car', 'Task', '1/08/2023', false);

