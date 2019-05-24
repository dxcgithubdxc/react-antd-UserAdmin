import React from 'react';
import MainLayout from '../components/MainLayout';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        console.log(this.props);
    }

    componentDidMount() {}

    render() {
        const { children, location } = this.props;
        return (
            <div>
                <MainLayout location={location}>
                    {children}
                </MainLayout>
            </div>
        );
    }
}
