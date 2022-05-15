import styled from "styled-components"

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