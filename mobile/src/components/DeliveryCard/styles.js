import styled from 'styled-components/native';

export const Container = styled.View`
  width: 95%;
  height: 186px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 3px #0000001a;
  elevation: 4;
  margin: 10px auto 25px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 13px 14.5px;
`;

export const Delivery = styled.Text`
  font-size: 14px;
  color: #7d40e7;
  font-weight: bold;
  margin-left: 10px;
`;

export const Body = styled.View`
  width: 80%;
  margin: 24px auto;
  padding: 0 10px;
`;

export const Slider = styled.View`
  padding: 0 50px;
  background: #7d40e7;
  width: 100%;
  height: 2px;
`;

export const ProgressStage = styled.View`
  position: relative;
`;

export const Circle = styled.View`
  z-index: 5;
  right: ${({ last }) => (last ? '-5px' : '0')};
  top: -15px;
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 4.5px;
  border-color: #7d40e7;
  border-width: 1px;
  background: ${({ reached }) => (reached ? '#7D40E7' : '#fff')};
`;

export const ProgressContainer = styled.View`
  margin-top: 9px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProgressText = styled.Text`
  max-width: 48px;
  font-size: 8px;
  color: #999;
  right: ${({ custom }) => (custom ? '-20px' : '-14px')};
  top: -10px;
  position: absolute;
  height: 25px;
  text-align: center;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fd;
  padding: 19.5px 18.5px 18.5px;
  overflow: hidden;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const DateContainer = styled.View``;

export const Label = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999;
`;

export const Text = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #444444;
`;

export const CityContainer = styled.View``;

export const DetailsButton = styled.TouchableOpacity`
  align-items: flex-start;
  justify-content: flex-start;
`;

export const DetailsButtonText = styled.Text`
  margin-top: 10px;
  color: #7d40e7;
  font-weight: bold;
  font-size: 12px;
`;
