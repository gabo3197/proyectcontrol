'use strict';

/**
 * persons/dtos/person.dto.js
 *
 * Data Transfer Objects — definen la "forma" de los datos
 * que entran (CreatePersonDto) y salen (PersonResponseDto) del módulo.
 *
 * Ventaja: si cambias el modelo interno, solo ajustas el DTO
 * sin romper el contrato con el cliente HTTP.
 */

/**
 * Transforma el body del request en el objeto que el service espera.
 * Filtra campos no permitidos (whitelist).
 */
const CreatePersonDto = (body) => ({
  name:       body.name?.trim(),
  email:      body.email?.trim().toLowerCase(),
  avatar_url: body.avatar_url || null,
});

/**
 * Transforma una instancia del modelo en la respuesta pública.
 * Oculta campos internos (e.g. updatedAt si no es relevante).
 */
const PersonResponseDto = (person) => ({
  id:         person.id,
  name:       person.name,
  email:      person.email,
  avatar_url: person.avatar_url,
  created_at: person.created_at,
});

module.exports = { CreatePersonDto, PersonResponseDto };
