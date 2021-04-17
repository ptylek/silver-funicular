import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';
import GoogleMap from './GoogleMap';
import Header from './Header';
import ArticleModal from './ArticleModal';
const { Content } = AntLayout;

const Layout = styled(AntLayout)`
	min-height: 100vh;
`;

const Inner = styled(Content)`
	min-height: 280px;
	background: #fff;
`;

const Page = () => {
	return (
		<Layout>
			<Header />
			<Inner>
				<GoogleMap />
				<ArticleModal />
			</Inner>
		</Layout>
	);
};

export default Page;
