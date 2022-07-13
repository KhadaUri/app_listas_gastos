import styled from "styled-components";
import { Link } from "react-router-dom";

const Boton = styled(Link)`
	background: ${(props) => props.primario ? '#0BB4AA' : '#000'};
	width: ${(props) => props.conIcono ? '15.62rem' : 'auto'}; /* 250px */
	margin-left: 1.25rem; /* 20px */
	border: none;
	border-radius: 0.625rem; /* 10px */
	color: #fff;
	font-family: 'Poppins', sans-serif;
	height: 3.75rem; /* 60px */
	padding: 1.25rem 1.87rem; /* 20px 30px */
	font-size: 1.25rem; /* 20px */
	font-weight: 500;
	cursor: pointer;
	text-decoration: none;
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	outline: none;
	transition-duration: 0.4s;
	
	&:hover {
		box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
	}

	svg {
		height: ${(props) => props.iconoGrande ? '100%' : '0.75rem;'};  /* 12px */
		fill: white;
	}
`;

export default Boton;