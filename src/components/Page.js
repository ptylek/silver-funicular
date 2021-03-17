import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';
const { Header, Content, Footer: AntFooter } = AntLayout;

const Layout = styled(AntLayout)`
	min-height: 100vh;
`;

const Inner = styled(Content)`
	min-height: 280px;
	padding: 24px;
	background: #fff;
`;

const Logo = styled.h2`
	color: #fff;
`;

const Footer = styled(AntFooter)`
	text-align: center;
`;

export default function Page() {
	return (
		<Layout>
			<Header>
				<Logo>Wikipedia Map</Logo>
			</Header>
			<Inner></Inner>
			<Footer>Wikipedia Map ©2021 Created by Pawel Tylek</Footer>
		</Layout>
	)
}
