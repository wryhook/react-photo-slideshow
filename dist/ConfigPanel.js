import styled from "styled-components";
import { useState } from "react";
const Container = styled.div`
    position: fixed;
    color: #d5d9db;
    font-weight: 500;
    z-index: 10;
    margin: 2rem;
    padding: 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    width: 20rem;
    max-width: 80%;
    border-radius: 01rem;
    box-shadow: 5px 5px 33px -4px rgba(0,0,0,0.5);
    background-color: #232324;
    /* border: 1px solid #4f4f4f; */
    display: flex;
    flex-direction: column;
    user-select: none;

    @media (max-width: 768px) {
      margin-top: 0.5rem;;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
`;
const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const TitleText = styled.div`
    font-size: 1.5rem;
`;
const Button = styled.div`
    margin-top: 1rem;
    padding: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-weight: 500;
    border-radius: 0.5rem;
    width: max-content;
    cursor: pointer;

`;
const SubmitButton = styled(Button)`
    color: white;
    margin-left: auto;
    background: #5693b6;
    margin-top: 1.5rem;

    &:hover {
        background: #65a3c7;
    }
`;
export default function ConfigPanel(props) {
  const [urlString, setUrlString] = useState('');
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkmode] = useState(true);
  const Dropdown = styled.div`
        transform: ${open ? 'rotate(180deg)' : 'none'};
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 0.5rem;

        &:hover {
            background: #414242;
        }
    `;
  const DarkModeButton = styled(Button)`
        color: ${darkMode ? 'white' : 'black'};
        background: ${darkMode ? '#489689' : '#b1b3b2'};
        font-weight: ${darkMode ? 500 : 400};

        &:hover {
            background: #489689;
        }
    `;
  const LightModeButton = styled(Button)`
        color: ${!darkMode ? 'white' : 'black'};
        background: ${!darkMode ? '#489689' : '#b1b3b2'};
        font-weight: ${!darkMode ? 500 : 400};

        &:hover {
            background: #489689;
        }
    `;

  function handleSubmit() {
    if (urlString) {
      props.setUrls(urlString.split(","));
    }

    props.setDarkmode(darkMode);
    setOpen(false);
  }

  return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(TopBar, {
    onClick: () => setOpen(prevOpen => !prevOpen)
  }, /*#__PURE__*/React.createElement(TitleText, null, "Configure Demo"), /*#__PURE__*/React.createElement(Dropdown, null, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      height: '2.5rem',
      width: '2.5rem'
    },
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, /*#__PURE__*/React.createElement("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M19 9l-7 7-7-7"
  })))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '1rem'
    }
  }, "Enter image urls below, separated by commas", /*#__PURE__*/React.createElement("textarea", {
    style: styles.textarea,
    value: urlString,
    onChange: event => setUrlString(event.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around'
    }
  }, /*#__PURE__*/React.createElement(LightModeButton, {
    onClick: () => setDarkmode(false)
  }, "Light Mode"), /*#__PURE__*/React.createElement(DarkModeButton, {
    onClick: () => setDarkmode(true)
  }, "Dark Mode")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      textAlign: 'center',
      marginTop: '0.5rem'
    }
  }, "This will change the appearance of the slideshow"), /*#__PURE__*/React.createElement(SubmitButton, {
    onClick: handleSubmit
  }, "Submit")));
}
const styles = {
  textarea: {
    border: 'none',
    resize: 'none',
    outline: 'none',
    border: '1px solid #828282',
    borderRadius: '0.5rem',
    padding: '1rem',
    font: 'inherit',
    marginTop: '1rem',
    height: '8rem',
    fontWeight: 400,
    background: '#edf1f2',
    width: '18rem'
  }
};