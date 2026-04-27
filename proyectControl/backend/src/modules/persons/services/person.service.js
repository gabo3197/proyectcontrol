'use strict';

const repository             = require('../repositories/person.repository');
const { CreatePersonDto, PersonResponseDto } = require('../dtos/person.dto');

/**
 * persons/services/person.service.js
 *
 * Lógica de negocio pura. No conoce Express ni Sequelize directamente.
 * Habla con el repository para datos y con los DTOs para transformar.
 */

const getAll = async () => {
  const persons = await repository.findAll();
  return persons.map(PersonResponseDto);
};

const getById = async (id) => {
  const person = await repository.findById(id);
  return person ? PersonResponseDto(person) : null;
};

const create = async (body) => {
  const dto    = CreatePersonDto(body);
  const person = await repository.save(dto);
  return PersonResponseDto(person);
};

module.exports = { getAll, getById, create };
