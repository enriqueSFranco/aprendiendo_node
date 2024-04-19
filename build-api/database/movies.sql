-- CREANDO LA BASE DE DATOS
CREATE DATABSE IF NOT EXISTS CineDB;

-- USANDO LA BASE DE DATOS CineDB
USE CineDB;

-- CREANDO LA TABLA DE Movies
CREATE TABLE IF NOT EXISTS Movies(
  id: BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  title: VARCHAR(255) NOT NULL,
  year: INT UNSIGNED NOT NULL,
  director: VARCHAR(122) DEFAULT 'Sin director',
  duration: INT NOT NULL,
  poster: TEXT,
  rate: DECIMAL(3, 1) UNSIGNED NOT NULL
);

-- INSERTANDO REGISTRONS EN LA TABLA MOVIES
INSERT INTO Movies(title, year, director, duration, poster, genre, rate) VALUES
('The Shawshank Redemption', '1994', 'Frank Darabont', '142', 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 'Drama', 9.3),
('The Dark Knight', '2008', 'Christopher Nolan', '152', 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 'Action,Crime,Drama', 9),
('Inception', '2010', 'Christopher Nolan', '148', 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 'Action,Adventure,Sci-Fi', 8.8),
('Pulp Fiction', '1994', 'Quentin Tarantino', '154', 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 'Crime,Drama', 8.9),
('Forrest Gump', '1994', 'Robert Zemeckis', '142', 'https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg', 'Drama,Romance', 8.8),
('Gladiator', '2000', 'Ridley Scott', '155', 'https://img.fruugo.com/product/0/60/14417600_max.jpg', 'Action,Adventure,Drama', 8.5),
('The Matrix', '1999', 'Lana Wachowski', '136', 'https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg', 'Action,Sci-Fi', 8.7),
('Interstellar', '2014', 'Christopher Nolan', '169', 'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg', 'Adventure,Drama,Sci-Fi', 8.6),
('The Lord of the Rings: The Return of the King', '2003', 'Peter Jackson', '201', 'https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg', 'Action,Adventure,Drama', 8.9),
('The Lion King', '1994', 'Roger Allers, Rob Minkoff', '88', 'https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg', 'Animation,Adventure,Drama', 8.5),
('The Avengers', '2012', 'Joss Whedon', '143', 'https://img.fruugo.com/product/7/41/14532417_max.jpg', 'Action,Adventure,Sci-Fi', 8),
('Jurassic Park', '1993', 'Steven Spielberg', '127', 'https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024', 'Adventure,Sci-Fi', 8.1),
('Titanic', '1997', 'James Cameron', '195', 'https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png', 'Drama,Romance', 7.8),
('The Social Network', '2010', 'David Fincher', '120', 'https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg', 'Biography,Drama', 7.7),
('Avatar', '2009', 'James Cameron', '162', 'https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg', 'Action,Adventure,Fantasy', 7.8);

CREATE TABLE IF NOT EXISTS Genres(
  id: SERIAL PRIMARY KEY,
  genre: VARCHAR(50) UNIQUE,
  FOREIGN KEY (movie_id) REFERENCES Movies(id)
);

-- INSERTANDO REGISTRONS EN LA TABLA GENRES
INSERT INTO Genres(genre) VALUES
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Romance'),
('Animation'),
('Sci-Fi'),
('Biography'),
('Fantasy')
('Terror');

CREATE TABLE IF NOT EXISTS MOVIE_GENRE(
  id: SERIAL PRIMARY KEY,
  movie_id: UUID REFERENCES Movies(id),
  genre_id: INT REFERENCES Genres(id),
  PRIMARY KEY (movie_id, genre_id)
);

-- INSERTANDO REGISTRONS EN LA TABLA MOVIE_GENRE
