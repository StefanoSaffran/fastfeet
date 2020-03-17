import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkWrapper from '~/helpers/LinkWrapper';
import Menu from './Menu';

import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo.png';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const [width, setWidth] = useState([0]);
  const profile = useSelector(state => state.admin.profile);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    function updateWidth() {
      setWidth([window.innerWidth]);
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleSignout = () => {
    dispatch(signOut());
  };

  return (
    <Container>
      <Content>
        {width <= 768 ? (
          <nav>
            <Menu />
            <img src={logo} alt="" />
          </nav>
        ) : (
          <nav>
            <img src={logo} alt="" />
            <LinkWrapper to="/deliveries">ENCOMENDAS</LinkWrapper>
            <LinkWrapper to="/deliveryman">ENTREGADORES</LinkWrapper>
            <LinkWrapper to="/recipients">DESTINATARIOS</LinkWrapper>
            <LinkWrapper to="/problems">PROBLEMAS</LinkWrapper>
          </nav>
        )}

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
            </div>
            <button type="button" onClick={handleSignout}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
