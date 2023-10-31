DROP DATABASE IF EXISTS eleicao;
CREATE DATABASE IF NOT EXISTS eleicao;
USE eleicao;

CREATE TABLE IF NOT EXISTS candidatos (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    num_candidato INT NOT NULL UNIQUE,
    nome_candidato VARCHAR(50) NOT NULL,
    votos INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS estudantes (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nome_estudante VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	senha VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS votos (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
	num_candidato INT NOT NULL,
	FOREIGN KEY (num_candidato) REFERENCES candidatos(num_candidato),
	FOREIGN KEY (email) REFERENCES estudantes(email)
);

INSERT INTO candidatos(nome_candidato, num_candidato) VALUES
("Ana Maria Torres", 1),
("Pedro Farias", 2),
("Joana Fon", 3); 

SELECT * FROM candidatos;
SELECT * FROM votos;
SELECT * FROM estudantes;
