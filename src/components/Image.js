import styled from "styled-components"

export default function Image(props) {
    const Container = styled.image`
        aspect-ratio: 4 / 3;
        width: 30%;
        background-color: black;
        background-image: url(${props.imageUrl});
        margin: 0.5rem;
        background-size: cover;
        background-position: center;
        cursor: pointer;

        &:hover {
            opacity: 0.9;
        }

        @media (max-width: 768px) {
            width: 100%;
            margin: 0 0 0.5rem 0;
        }

    `   
    return(
        <Container onClick={() => props.openSlideshow(props.imageIdx)} />
    )
}