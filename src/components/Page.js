import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';
import GooglePage from './../pages/map';
const { Header, Content, Footer: AntFooter } = AntLayout;

const Layout = styled(AntLayout)`
	min-height: 100vh;
`;

const Inner = styled(Content)`
	min-height: 280px;
	background: #fff;
`;

const Logo = styled.h2`
	color: #fff;
`;

const Footer = styled(AntFooter)`
	text-align: center;
`;

const Page = () => {
	return (
		<Layout>
			<Header>
				<Logo>Wikipedia Map</Logo>
			</Header>
			<Inner>
				<GooglePage/>
			</Inner>
			<Footer>©2021 by Pawel Tylek</Footer>
		</Layout>
	)
}

export default Page;