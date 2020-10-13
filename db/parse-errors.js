// Source: https://github.com/knex/knex/issues/272;

const detectUniqueConstraintError = ({ message }) => {
  return message.includes("duplicate key value violates unique constraint"); 
}

module.exports = { detectUniqueConstraintError };