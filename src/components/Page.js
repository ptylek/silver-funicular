import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';
import GoogleMap from './GoogleMap';
import Header from './Header';
const { Content, Footer: AntFooter } = AntLayout;

const Layout = styled(AntLayout)`
	min-height: 100vh;
`;

const Inner = styled(Content)`
	min-height: 280px;
	background: #fff;
`;

const Footer = styled(AntFooter)`
	text-align: center;
	font-size: 10px;
`;

const Page = () => {
	return (
		<Layout>
			<Header />
			<Inner>
				<GoogleMap />
			</Inner>
			<Footer>
				©2021 by Pawel Tylek
				<br />
				during Netguru College: Frontend React
			</Footer>
		</Layout>
	);
};

export default Page;
