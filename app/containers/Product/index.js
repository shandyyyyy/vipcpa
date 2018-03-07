import React from 'react';
import { WingBlank, WhiteSpace, Flex, NavBar, Icon, Button, ListView } from 'antd-mobile';
import { getData, deleteProduct } from '../../api/product';
import '../../assets/css/product.less';


export default class Product extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            isLoading: false
        };
    }

    onLeftClick = () => {
        this.props.history.push('/');
    }

    search = () => {
        this.props.history.push('/search');
    }

    // 编辑
    handleEdit = () => {

    }

    // 删除
    handleRemove = (courseid, agentid) => {
        // deleteProduct({
        //     courseid,
        //     agentid
        // })
        //     .then(response => {

        //     });
    }

    onEndReached = () => {
        if (this.currentPage === this.totalPages) {
            return;
        }
        this.setState({ isLoading: true });
        getData({
            page: ++this.currentPage,
        })
            .then(response => {
                this.data = [...this.data, ...response.data.list || []];
                this.currentPage = response.data.currentPage;
                this.totalPages = response.data.totalPages;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.data),
                    isLoading: false
                });
            });
    }

    componentDidMount() {
        getData()
            .then(response => {
                this.data = response.data.list;
                this.currentPage = response.data.currentPage;
                this.totalPages = response.data.totalPages;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.data)
                });
            });
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                className="separator"
            />
        );
        const row = rowData => {
            let oldPrice, discount;
            if (rowData.discount && parseFloat(rowData.discount) !== 1) {
                oldPrice = rowData.vPrice && '￥' + rowData.vPrice;
                discount = <span className="discount">{rowData.discount * 10 + '折'}</span>;
            }
            let newPrice = rowData.price && <span><span className="icon">￥</span>{rowData.price}</span>;
            return (
                <WingBlank>
                    <WhiteSpace />
                    <Flex>
                        {discount}
                    </Flex>
                    <WhiteSpace />
                    <Flex justify="between">
                        <span className="course-name">
                            {'「' + rowData.project_name + '」' + rowData.course_name}
                        </span>
                        <span className="old-price">
                            {oldPrice}
                        </span>
                    </Flex>
                    <WhiteSpace />
                    <Flex justify="between">
                        <span className="detail">
                            库存：{rowData.counts}
                        </span>
                        <span className="new-price">
                            {newPrice}
                        </span>
                    </Flex>
                    <WhiteSpace />
                    <Flex justify="between" className="detail">
                        {rowData.agent_name}
                        <span>
                            {rowData.course_status}
                        </span>
                    </Flex>
                    <WhiteSpace />
                    <Flex justify="end" className="detail">
                        <span className="button" onClick={this.handleEdit}>编辑</span>
                        <span onClick={this.handleRemove(rowData.course_id, rowData.agent_id)}>删除</span>
                    </Flex>
                </WingBlank>
            )
        };
        const renderFooter = () => (
            <div style={{ padding: 30, textAlign: 'center' }}>
                {this.state.isLoading ? '加载中...' : '已显示全部'}
            </div>
        );
        return (
            <div>
                <NavBar
                    leftContent={<Icon type="left"></Icon>}
                    rightContent={<Icon type="search" onClick={this.search}></Icon>}
                    onLeftClick={this.onLeftClick}>
                    商品
                </NavBar>
                <ListView
                    useBodyScroll
                    dataSource={this.state.dataSource}
                    renderRow={row}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                    renderFooter={renderFooter}
                    renderSeparator={separator}
                    className="listView"
                />
            </div>
        );
    }
}