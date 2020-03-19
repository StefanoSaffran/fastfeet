import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DeliverymanInfo = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 0 30px;
`;

export const AvatarContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 136px;
  height: 136px;
  border-radius: 68px;
  margin: 60px 0 40px;
`;

export const AvatarText = styled.Text``;

export const Label = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
  margin-bottom: 15px;
`;

export const Email = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
  margin-bottom: 15px;
`;

export const Data = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
  margin-bottom: 15px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 15px;
  background: #e74040;
`;
