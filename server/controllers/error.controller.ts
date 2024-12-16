import { GraphQLError } from 'graphql';

const handleCastError = (error: any) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  throw new GraphQLError(message);
};

const handleValidationError = (error: any) => {
  const message = Object.values(error.errors).map((el: any) => el.message);
  throw new GraphQLError(`Invalid input: ${message.join(', ')}`);
};

const errorHandler = (err: any) => {
  if (err.name === 'CastError') handleCastError(err);
  if (err.name === 'ValidationError') handleValidationError(err);
  throw err;
};

export default errorHandler;
