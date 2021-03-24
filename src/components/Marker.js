import styled from 'styled-components';
import { Tooltip } from 'antd';

const Circle = styled.div`
	background-color: #ff7e23e0;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	box-shadow: 0px 0px 5px #ffa769;
	opacity: 0.7;
	transition: all 0.2s ease-in;
	cursor: pointer;
	transform: scale(1);

	&:hover {
		opacity: 1;
	}
`;

export default function Marker({ title }) {
	return (
		<Tooltip title={title}>
			<Circle />
		</Tooltip>
	);
}
