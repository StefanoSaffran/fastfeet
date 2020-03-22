import React from 'react';
import PropTypes from 'prop-types';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
  FaAngleLeft,
} from 'react-icons/fa';

import { Container } from './styles';

export default function Pagination({ page, totalPages, setPage }) {
  return (
    <Container>
      <div>
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <FaAngleLeft size={20} />
          Anterior
        </button>
      </div>
      <p>
        {page} de {totalPages}
      </p>
      <div>
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Próxima
          <FaAngleRight size={20} />
        </button>
      </div>
    </Container>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
