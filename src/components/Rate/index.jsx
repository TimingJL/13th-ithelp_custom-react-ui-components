import React, { useState } from 'react';
import styled from 'styled-components';
import StarIcon from '@material-ui/icons/Star';
import PropTypes from 'prop-types';

import { useColor } from 'hooks/useColor';

const RateWrapper = styled.div`
  display: flex;
`;

const CharacterWrapper = styled.div`
  position: relative;
`;

const CharacterFirst = styled.div`
  position: absolute;
  color: ${(props) => (props.$isActive ? props.$starColor : '#F0F0F0')};
  width: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const CharacterSecond = styled.div`
  color: ${(props) => (props.$isActive ? props.$starColor : '#F0F0F0')};
  cursor: pointer;
`;

const Rate = ({
  count,
  character,
  themeColor,
}) => {
  const { makeColor } = useColor();
  const starColor = makeColor({ themeColor });
  const [previewValue, setPreviewValue] = useState(0);

  return (
    <RateWrapper>
      {
        [...Array(count).keys()].map((itemKey) => (
          <CharacterWrapper key={itemKey}>
            <CharacterFirst
              $starColor={starColor}
              $isActive={itemKey + 0.5 <= previewValue}
              onMouseOver={() => setPreviewValue(itemKey + 0.5)}
              onMouseLeave={() => setPreviewValue(0)}
            >
              {character}
            </CharacterFirst>
            <CharacterSecond
              $starColor={starColor}
              $isActive={itemKey + 1 <= previewValue}
              onMouseOver={() => setPreviewValue(itemKey + 1)}
              onMouseLeave={() => setPreviewValue(0)}
            >
              {character}
            </CharacterSecond>
          </CharacterWrapper>
        ))
      }
    </RateWrapper>
  );
};

Rate.propTypes = {
  /**
   * star 總數
   */
  count: PropTypes.number,
  /**
   * 自定義字符
   */
  character: PropTypes.element,
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor: PropTypes.oneOfType([PropTypes.oneOf(['primary', 'secondary']), PropTypes.string]),
};

Rate.defaultProps = {
  count: 5,
  character: <StarIcon />,
  themeColor: '#FBDB14',
};

export default Rate;
