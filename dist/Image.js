import styled from "styled-components";
export default function Image(props) {
  const Container = styled.image`
        aspect-ratio: 4 / 3;
        width: 32%;
        background-color: black;
        background-image: url(${props.imageUrl});
        background-size: cover;
        background-position: center;
        cursor: pointer;
        margin: 0.25rem;

        @media (max-width: 768px) {
            width: 100%;
            margin: 0 0 0.5rem 0;
        }

    `;
  const BlackBox = styled.div`
        height: 100%;
        width: 100%;
        background: black;
        opacity: 0;
        transition: opacity 0.15s;

        &:hover {
            opacity: 0.25;
        }
    `;
  return /*#__PURE__*/React.createElement(Container, {
    onClick: () => props.openSlideshow(props.imageIdx)
  }, /*#__PURE__*/React.createElement(BlackBox, null));
}