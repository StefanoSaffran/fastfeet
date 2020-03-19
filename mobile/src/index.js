import { useSelector } from 'react-redux';

import createRouter from '~/Routes';

export default function App() {
  const signed = useSelector(state => state.deliveryman.signed);

  return createRouter(signed);
}
