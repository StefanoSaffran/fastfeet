import React from 'react';

import PropTypes from 'prop-types';

import { columns } from '~/helpers/columns';
import THead from './THead';
import TBDeliveries from './TBody/TBodyDeliveries';
import TBDeliverymen from './TBody/TBodyDeliverymen';
import TBRecipients from './TBody/TBodyRecipients';
import TBodyProblems from './TBody/TBodyProblems';

import { Container } from './styles';

export default function Table({
  data,
  column,
  handleDelete,
  handleCancel,
  handleOpen,
}) {
  const columnsName = columns[column];

  return (
    <Container>
      <THead columns={columnsName} />
      {column === 'deliveries' && (
        <TBDeliveries
          data={data}
          handleDelete={handleDelete}
          handleOpen={handleOpen}
        />
      )}
      {column === 'deliverymen' && (
        <TBDeliverymen data={data} handleDelete={handleDelete} />
      )}
      {column === 'recipients' && (
        <TBRecipients data={data} handleDelete={handleDelete} />
      )}
      {column === 'problems' && (
        <TBodyProblems
          data={data}
          handleCancel={handleCancel}
          handleOpen={handleOpen}
        />
      )}
    </Container>
  );
}

Table.defaultProps = {
  handleDelete: null,
  handleCancel: null,
  handleOpen: null,
};

Table.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  column: PropTypes.string.isRequired,
  handleDelete: PropTypes.func,
  handleCancel: PropTypes.func,
  handleOpen: PropTypes.func,
};
