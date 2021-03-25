import styled from 'styled-components';
import { Tooltip } from 'antd';
import { emit } from '../pages/map/mediator';

const colors = {
	orange: {
		background: '#ff7e23e0',
		shadow: '#ffa769',
	},
	blue: {
		background: '#237bffe0',
		shadow: '#698bff',
	},
};

const Circle = styled.div`
	background-color: ${({ color }) => colors[color].background};
	border-radius: 50%;
	width: 30px;
	height: 30px;
	box-shadow: 0px 0px 5px ${({ color }) => colors[color].shadow};
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
			<Circle onClick={handleClick} color='orange' />
		</Tooltip>
	);
}
