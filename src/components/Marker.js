import styled from 'styled-components';
import { Tooltip } from 'antd';
import { emit } from '../pages/map/mediator';

const Circle = styled.div`
	background-color: #ff7e23e0;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	box-shadow: 0px 0px 5px #ffa769;
	opacity: 0.7;
	transition: opacity 0.2s ease-in;
	cursor: pointer;

	&:hover {
		opacity: 1;
	}
`;

export default function Marker({ title, pageid }) {
	function handleClick() {
		emit('markerClicked', pageid);
	}

	return (
		<Tooltip title={title}>
			<Circle onClick={handleClick} />
		</Tooltip>
	);
}
