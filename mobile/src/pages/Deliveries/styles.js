import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  margin: 40px 0 22.5px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AvatarContainer = styled.View``;

export const NameContainer = styled.View`
  margin-left: 12px;
  font-size: 12px;
  color: #666;
`;

export const Greetings = styled.Text`
  color: #666;
  font-size: 12px;
`;

export const Name = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 22px;
`;

export const Avatar = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
`;

export const AvatarText = styled.Text``;

export const LogoutButton = styled(TouchableOpacity)`
  margin-right: 12px;
`;

export const Body = styled.View`
  margin: 0 15px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const LeftTitle = styled.Text`
  color: #444;
  font-size: 22px;
  font-weight: bold;
`;

export const RightTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RightViewButton = styled.TouchableOpacity`
  margin: 0 7.5px;
  ${({ active }) =>
    active &&
    css`
      border-color: #7d40e7;
      border-bottom-width: 1px;
      border-style: solid;
    `}
`;

export const RightTitle = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin: auto;
  line-height: 15px;
  color: ${({ active }) => (active ? '#7D40E7' : '#999')};
`;

export const DeliveryList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 10, paddingBottom: 150 },
})``;
